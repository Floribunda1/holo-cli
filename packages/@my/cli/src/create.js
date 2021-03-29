const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const inquirer = require('inquirer');

const PromptManager = require('./prompt-manager')

const internalModules = ['babel', 'eslint', 'webpack'];

const createProject = async (name) => {
  const targetDirectory = path.join(process.cwd(), name);
  if (fs.existsSync(targetDirectory)) {
    const { shouldRemoveDir } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldRemoveDir',
        message: 'Target directory already exists, remove it?',
        default: false,
      },
    ]);

    if (!shouldRemoveDir) {
      return;
    }

    console.log(`/n Removing ${chalk.cyan(targetDirectory)} ...`);
    await fs.remove(targetDirectory);
  }

  const promptManager = new PromptManager();

  const modules = getInternalModules();
  modules.forEach((m) => m(promptManager));

  const answers = await inquirer.prompt(prompts);

  console.log(answers);
};

const getInternalModules = () => {
  return internalModules.map((module) => require(`./modules/${module}.js`));
};

module.exports = {
  createProject,
};
