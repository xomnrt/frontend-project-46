import * as fs from 'node:fs';
import compareFiles from '../src/index.js';

const cases = [
  ['file1.json', 'file2.yml', 'json', 'file1_file2.json'],
  ['file1.yaml', 'file2.json', 'plain', 'file1_file2.plain'],
  ['file1.yaml', 'file2.json', 'stylish', 'file1_file2.stylish'],
];

test.each(cases)('compare file %s and %s test, output %s', (f1Path, f2Path, format, expectedPath) => {
  const expected = fs.readFileSync(`__tests__/__fixtures__/results/${expectedPath}`, 'utf8').trim();
  expect(
    compareFiles(`__tests__/__fixtures__/${f1Path}`, `__tests__/__fixtures__/${f2Path}`, format),
  ).toBe(expected);
});
