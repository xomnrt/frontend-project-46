import * as fs from 'node:fs';
import compareFiles from '../src/index.js';

const cases = [
  ['recursiveFile1.json', 'recursiveFile2.json', 'stylish', 'recursive.stylish'],
  ['recursiveFile1.json', 'recursiveFile2.json', 'plain', 'recursive.plain'],
  ['recursiveFile1.json', 'recursiveFile2.json', 'json', 'recursive.json'],
  ['recursive1.yml', 'recursive2.yaml', 'plain', 'recursive.plain'],
  ['recursive1.yml', 'recursive2.yaml', 'json', 'recursive.json'],
  ['recursive1.yml', 'recursive2.yaml', 'stylish', 'recursive.stylish'],

];

test.each(cases)('compare file %s and %s test, output %s', (f1Path, f2Path, format, expectedPath) => {
  const expected = fs.readFileSync(`__tests__/__fixtures__/results/${expectedPath}`, 'utf8').trim();
  expect(
    compareFiles(`__tests__/__fixtures__/${f1Path}`, `__tests__/__fixtures__/${f2Path}`, format),
  ).toBe(expected);
});
