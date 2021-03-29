#!/usr/bin/env node
const { program } = require('commander');
const { createProject } = require('../src/create');

program.version('1.0.0');

program
  .command('create <project>')
  .description('create new project')
  .action((name) => {
    createProject(name);
  });

program.parse();
