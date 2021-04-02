const { mergeOptions } = require('@my/utils');
const globby = require('globby');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const chalk = require('chalk');

class Generator {
  constructor(pkg, directory) {
    this.pkg = pkg;
    this.context = directory;
    this.files = {};
    this.fileInjectFunctions = [];
    this.context = path.join(process.cwd(), this.pkg.name);
  }

  // 让插件注入文件，由于渲染是异步操作，因此最好放在一个地方统一处理掉
  injectFile(source, data = {}) {
    const dir = getFunctionCalledDir();
    source = path.resolve(dir, source);
    this.fileInjectFunctions.push(async () => {
      // 匹配路径对应下的文件
      const sourceFilesPath = await globby(['**/*'], {
        cwd: source,
        dot: true,
      });
      sourceFilesPath.forEach((filePath) => {
        // TODO: 判断最后一行是否为空行
        const content = this.renderFile(path.resolve(source, filePath), data);
        this.files[filePath] = content;
      });
    });
  }

  renderFile(path, data) {
    const template = fs.readFileSync(path, 'utf-8');
    return ejs.render(template, data);
  }

  async generate() {
    for (const func of this.fileInjectFunctions) {
      await func();
    }
    this.files['package.json'] = JSON.stringify(this.pkg, null, 2) + '\n';

    // 创建项目文件夹
    fs.mkdirSync(this.pkg.name);

    // 将项目中的文件写入
    writeFilesToDir(this.files, this.context);
  }

  extendPackage(obj) {
    const pkg = this.pkg;
    mergeOptions(pkg, obj);
  }
}

function writeFilesToDir(files, context) {
  console.log('🦧 创建文件中...');
  Object.keys(files).forEach((relativePath) => {
    const dirName = path.dirname(relativePath);
    const fullPath = path.resolve(context, relativePath);
    // 如果有嵌套目录如: foo/bar/baz, 需要递归创建文件夹
    dirName.split('/').reduce((acc, d) => {
      const temp = path.join(acc, d);
      if (!fs.existsSync(temp)) {
        fs.mkdirSync(temp);
      }
      return temp;
    }, context);
    fs.writeFileSync(fullPath, files[relativePath]);
  });
  console.log('🐒 文件创建完啦...');
}

/**
 * 获取函数被调用的时候的目录
 */
function getFunctionCalledDir() {
  const obj = {};
  Error.captureStackTrace(obj);
  /*
   * stackInfo 错误信息类似于下面这样
   * Error
   *  at getFunctionCalledDir (E:\my-cli\packages\@my\cli\src\generator.js:36:9)
   *  at Generator.injectFile (E:\my-cli\packages\@my\cli\src\generator.js:14:5)
   *  at module.exports (E:\my-cli\packages\@my\cli-plugin-babel\generator\index.js:2:7)
   *  at E:\my-cli\packages\@my\cli\src\create.js:56:5
   *  at Array.forEach (<anonymous>)
   *  at createProject (E:\my-cli\packages\@my\cli\src\create.js:54:19)
   *  at processTicksAndRejections (internal/process/task_queues.js:93:5)
   */
  const stackInfo = obj.stack.split('\n');
  // 用来匹配路径
  const pathReg = /at\s(?:\w+\.\w+\s)\((.+)(\:\d+){2}\)/;

  const fileName = stackInfo[3].match(pathReg)[1];
  return path.dirname(fileName);
}

module.exports = Generator;
