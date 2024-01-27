/* eslint-disable no-restricted-syntax */

export function setStylish(obj, obj1, obj2) {
  let objAsString = '{';

  for (const [key, value] of Object.entries(obj)) {
    switch (value) {
      case 'unchanged':
        objAsString += `\n  ${key}: ${obj1[key]}`;
        break;
      case 'changed':
        objAsString += `\n  - ${key}: ${obj1[key]}`;
        objAsString += `\n  + ${key}: ${obj2[key]}`;
        break;
      case 'deleted':
        objAsString += `\n  + ${key}: ${obj1[key]}`;
        break;
      case 'added':
        objAsString += `\n  + ${key}: ${obj2[key]}`;
        break;
      default:
    }
  }
  objAsString += '\n}';

  return objAsString;
}

export function setPlain(obj, obj1, obj2) {
  let objAsString = '{';

  for (const [key, value] of Object.entries(obj)) {
    switch (value) {
      case 'changed':
        objAsString += `\n  Property '${key}' was updated. From ${obj1[key]} to ${obj2[key]}`;
        break;
      case 'deleted':
        objAsString += `\n  Property '${key}' was removed`;
        break;
      case 'added':
        objAsString += `\n  Property '${key}' was added with value: ${obj2[key]}`;
        break;
      default:
    }
  }
  objAsString += '\n}';
  return objAsString;
}
