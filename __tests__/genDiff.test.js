import * as fs from 'node:fs';
import { compareFiles } from '../src/genDiff.js';

test('compare files test, output json', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/results/file1_file2.json', 'utf8').trim();

  expect(
    compareFiles('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.yml', 'json'),
  ).toBe(expected);
});

test('compare files test, output plain', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/results/file1_file2.plain', 'utf8').trim();

  expect(
    compareFiles('__tests__/__fixtures__/file1.yaml', '__tests__/__fixtures__/file2.json', 'plain'),
  ).toBe(expected);
});

test('compare files test, output stylish', () => {
  const expected = fs.readFileSync('__tests__/__fixtures__/results/file1_file2.stylish', 'utf8').trim();

  expect(
    compareFiles('__tests__/__fixtures__/file1.yaml', '__tests__/__fixtures__/file2.json', 'stylish'),
  ).toBe(expected);
});
