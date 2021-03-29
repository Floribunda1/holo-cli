#!/usr/bin/env node
const { program } = require('commander');
const { createProject } = require('../src/create');

program.version('1.0.0');

program.command('create <repository>').action((name) => {
  createProject(name);
});

program.parse();
