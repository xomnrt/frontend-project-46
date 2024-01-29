/* eslint-disable no-restricted-syntax */
import * as fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

function readFile(filePath) {
  const absoluteFilePath = path.resolve(filePath);
  if (fs.existsSync(absoluteFilePath)) {
    const newFile = fs.readFileSync(absoluteFilePath, 'utf8');
    return newFile;
  }
  throw new Error(`The path is incorrect: ${JSON.stringify(absoluteFilePath)}`);
}

function objectify(fileContent, fileFormat) {
  switch (fileFormat) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yaml':
    case 'yml':
      return YAML.parse(fileContent);
    default:
      throw new Error(`Format ${fileFormat} is unsupported.`);
  }
}

export default function parseObjectFromFile(filePath) {
  const file = readFile(filePath);
  const dotIdx = filePath.lastIndexOf('.');
  if (dotIdx === -1) {
    throw new Error(`File name doesn't contain extention: ${filePath}`);
  }

  const fileFormat = filePath.slice(dotIdx + 1);
  return objectify(file, fileFormat);
}
