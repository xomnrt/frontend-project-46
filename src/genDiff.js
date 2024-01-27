/* eslint-disable no-restricted-syntax */
import { setStylish, setPlain } from './formatter.js';

export function genDiff(obj1, obj2) {
  const resultObj = {};

  for (const key of Object.keys(obj1)) {
    if (!Object.hasOwn(obj2, key)) {
      resultObj[key] = 'deleted';
    }
  }

  for (const [key, value] of Object.entries(obj2)) {
    if (Object.hasOwn(obj1, key)) {
      if (
        (typeof obj1[key] === 'object' && obj1[key] !== null)
        && (typeof value === 'object' && value !== null)
      ) {
        const newDiff = genDiff(obj1[key], value);

        const changed = Object.values(newDiff)
          .findIndex((subvalue) => subvalue !== 'unchanged') > 0;

        resultObj[key] = changed ? newDiff : 'unchanged';
      } else {
        resultObj[key] = obj1[key] === value ? 'unchanged' : 'changed';
      }
    }
    if (!Object.hasOwn(obj1, key)) {
      resultObj[key] = 'added';
    }
  }
  const orderedObj = {};
  Object.keys(resultObj).sort().forEach((key) => {
    orderedObj[key] = resultObj[key];
  });

  return orderedObj;
}

export function genDiffFormatter(obj1, obj2, format = 'stylish') {
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

// const obj1 = {
//   host: 'hexlet.io',
//   timeout: 50,
//   proxy: '123.234.53.22',
//   follow: false,
// };

// const obj2 = {
//   timeout: 20,
//   verbose: true,
//   host: 'hexlet.io',
// };

// const res = genDiffFormatter(obj1, obj2, 'json');
// console.log(res);
