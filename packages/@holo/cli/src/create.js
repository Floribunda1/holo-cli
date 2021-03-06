const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { clearConsole } = require('@holo/utils');
const execa = require('execa');

const PromptManager = require('./prompt-manager');
const PromptInjector = require('./prompt-injector');
const Generator = require('./generator');
const PackageManager = require('./package-manager');

const internalModules = [
	'babel',
	'webpack',
	'typescript',
	'commitlint',
	'eslint',
];

const createProject = async (name) => {
	const targetDirectory = path.join(process.cwd(), name);
	if (fs.existsSync(targetDirectory)) {
		clearConsole();

		const { shouldRemoveDir } = await inquirer.prompt([
			{
				type: 'confirm',
				name: 'shouldRemoveDir',
				message: '⛳ 目标文件夹已经存在，是否移除?',
				default: false,
			},
		]);

		if (!shouldRemoveDir) {
			return;
		}

		console.log(`🎏 移除 ${chalk.cyan(targetDirectory)} 中...`);
		await fs.rmdirSync(targetDirectory, {
			recursive: true,
		});
		console.log(`🎍 ${chalk.cyan(targetDirectory)} 移除完成...`);
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
		version: '0.1.0',
		scripts: {},
		dependencies: {},
		devDependencies: {},
	};

	const generator = new Generator(packageJson, targetDirectory);

	answers.features.forEach((f) => {
		const pluginInjector = require(`@holo/cli-plugin-${f}/generator`);
		pluginInjector(generator, answers);
	});

	await generator.generate();

	await execa('git', ['init'], {
		cwd: targetDirectory,
	});

	const packageManager = new PackageManager(
		targetDirectory,
		answers.packageManager
	);

	await packageManager.install();

	// clearConsole()

	console.log('依赖下载完成');
	console.log(`$ cd ${chalk.cyan(name)}`);
	console.log(`$ ${chalk.cyan(answers.packageManager)} run dev`);
};

const getInternalModules = () => {
	return internalModules.map((module) =>
		require(`./promptModules/${module}.js`)
	);
};

module.exports = {
	createProject,
};
