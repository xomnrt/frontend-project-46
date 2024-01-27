/* eslint-disable no-restricted-syntax */
import { setStylish, setPlain } from './formatter.js';
import parseObjectFromFile from './index.js';

function sortedObject(obj) {
  const orderedObj = {};
  Object.keys(obj).sort().forEach((key) => {
    orderedObj[key] = obj[key];
  });

  return orderedObj;
}

export function genDiff(obj1, obj2) {
  const resultObj = {};

  for (const key of Object.keys(obj1)) {
    if (!Object.hasOwn(obj2, key)) {
      resultObj[key] = 'deleted';
    }
  }

  for (const [key, value] of Object.entries(obj2)) {
    if (Object.hasOwn(obj1, key)) {
      resultObj[key] = obj1[key] === value ? 'unchanged' : 'changed';
    } else {
      resultObj[key] = 'added';
    }
  }

  return sortedObject(resultObj);
}

export function genDiffFormatted(obj1, obj2, format) {
  const diff = genDiff(obj1, obj2);

  switch (format) {
    case 'json':
      return JSON.stringify(diff, null, '  ');
    case 'plain':
      return setPlain(diff, obj1, obj2);
    case 'stylish':
      return setStylish(diff, obj1, obj2);
    default:
      throw new Error(`Incorrect format: ${format}`);
  }
}

export function compareFiles(filePath1, filePath2, format) {
  const obj1 = parseObjectFromFile(filePath1);
  const obj2 = parseObjectFromFile(filePath2);
  return genDiffFormatted(obj1, obj2, format);
}
