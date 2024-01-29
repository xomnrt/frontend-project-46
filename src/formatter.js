function setStylish(obj, obj1, obj2) {
  let objAsString = '{';

  Object.entries(obj).forEach(([key, value]) => {
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
  });

  objAsString += '\n}';

  return objAsString;
}

function setPlain(obj, obj1, obj2) {
  let objAsString = '{';

  Object.entries(obj).forEach(([key, value]) => {
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
  });

  objAsString += '\n}';

  return objAsString;
}

export default function formatDiff(diff, obj1, obj2, format) {
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
