#!/usr/bin/env node
import { program } from 'commander';
import compareFiles from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<path1> <path2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <format>', 'output format', 'stylish')
  .action((filePath1, filePath2, options) => {
    const res = compareFiles(filePath1, filePath2, options.format);
    console.log(res);
  });

program.parse();
