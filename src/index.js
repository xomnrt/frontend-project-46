/* eslint-disable no-restricted-syntax */
import * as fs from 'node:fs';
import path from 'node:path';

export function openFile(filePath) {
  const normalizedFilePath = path.resolve(filePath);
  if (fs.existsSync(normalizedFilePath)) {
    const newFile = fs.readFileSync(normalizedFilePath, 'utf8');
    return newFile;
  }
  throw new Error('The path is incorrect!');
}

// TODO добавить проверку на формат файла (yaml / json)
export function objectify(fileContent) {
  const obj = JSON.parse(fileContent);
  return obj;
}
