#!/usr/bin/env node

import { program } from 'commander';
import parseObjectFromFile from '../src/index.js';
import { genDiffFormatted } from '../src/genDiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<path1> <path2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <format>', 'output format', 'stylish')
  .action((filePath1, filePath2, options) => {
    const file1 = parseObjectFromFile(filePath1);
    const file2 = parseObjectFromFile(filePath2);
    const res = genDiffFormatted(file1, file2, options.format);
    console.log(res);
  });

program.parse();
