const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { clearConsole } = require("@my/utils");

const PromptManager = require("./prompt-manager");
const PromptInjector = require("./prompt-injector");
const Generator = require("./generator");

const internalModules = ["babel"];

const createProject = async (name) => {
  const targetDirectory = path.join(process.cwd(), name);
  if (fs.existsSync(targetDirectory)) {
    clearConsole();

    const { shouldRemoveDir } = await inquirer.prompt([
      {
        type: "confirm",
        name: "shouldRemoveDir",
        message: "Target directory already exists, remove it?",
        default: false,
      },
    ]);

    if (!shouldRemoveDir) {
      return;
    }

    console.log(`/n Removing ${chalk.cyan(targetDirectory)} ...`);
    await fs.remove(targetDirectory);
  }

  clearConsole();
  // 管理命令行交互
  const promptManager = new PromptManager();
  // 向管理注入新的命令
  const promptInjector = new PromptInjector(promptManager);
  const modules = getInternalModules();
  modules.forEach((m) => m(promptInjector));

  const answers = await inquirer.prompt(promptManager.getPrompts());

  clearConsole();

  const packageJson = {
    name,
    version: "0.1.0",
    dependencies: {},
    devDependencies: {},
  };

  const generator = new Generator(packageJson, targetDirectory);

  answers.features.forEach((f) => {
    const pluginInjector = require(`@my/cli-plugin-${f}/generator`);
    pluginInjector(generator, answers);
  });

  await generator.generate();

  if (answers.shouldDownloadDependency) {
  }
};

const getInternalModules = () => {
  return internalModules.map((module) =>
    require(`./promptModules/${module}.js`)
  );
};

module.exports = {
  createProject,
};
