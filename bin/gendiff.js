#!/usr/bin/env node

import { program } from 'commander';
import { openFile, objectify } from '../src/index.js';
import genDiff from '../src/genDiff.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<path1> <path2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format', 'output format')
  .action((filePath1, filePath2) => {
    const file1 = objectify(openFile(filePath1));
    const file2 = objectify(openFile(filePath2));
    const difference = genDiff(file1, file2);
    console.log(difference);
  });

program.parse();
