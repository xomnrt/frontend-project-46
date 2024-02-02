const pad = '  ';

function printUnchanged(valueToPrint, depth) {
  if (valueToPrint === null || typeof valueToPrint !== 'object') {
    return `${valueToPrint}`;
  }

  let unchandedPart = '{';

  Object.entries(valueToPrint).forEach(([key, value]) => {
    unchandedPart += `\n${pad.repeat(depth)}${key}: ${printUnchanged(value, depth + 2)}`;
  });

  unchandedPart += `\n${pad.repeat(depth - 2)}}`;

  return unchandedPart;
}

function setStylish(diff, obj1, obj2, depth = 2) {
  let objAsString = '{';

  Object.entries(diff).forEach(([field, diffState]) => {
    // console.log(`diffstate: ${field} ==> ${diffState}`);

    if (typeof diffState === 'object') {
      objAsString += `\n${pad.repeat(depth)}${field}: ${setStylish(diffState, obj1[field], obj2[field], depth + 2)}`;
    }

    switch (diffState) {
      case 'unchanged':
        objAsString += `\n${pad.repeat(depth)}${field}: ${printUnchanged(obj1[field], depth + 2)}`;
        break;
      case 'changed':
        objAsString += `\n${pad.repeat(depth - 1)}- ${field}: ${printUnchanged(obj1[field], depth + 2)}`;
        objAsString += `\n${pad.repeat(depth - 1)}+ ${field}: ${printUnchanged(obj2[field], depth + 2)}`;
        break;
      case 'deleted':
        objAsString += `\n${pad.repeat(depth - 1)}- ${field}: ${printUnchanged(obj1[field], depth + 2)}`;
        break;
      case 'added':
        objAsString += `\n${pad.repeat(depth - 1)}+ ${field}: ${printUnchanged(obj2[field], depth + 2)}`;
        break;
      default:
    }
  });

  objAsString += `\n${pad.repeat(depth - 2)}}`;

  return objAsString;
}

function setPlain(diff, obj1, obj2, prefix = '') {
  function fillComplexValue(valueToPrint) {
    if (valueToPrint === null || typeof valueToPrint !== 'object') {
      if (typeof valueToPrint === 'string') {
        return `'${valueToPrint}'`;
      }
      return `${valueToPrint}`;
    }
    return '[complex value]';
  }

  let objAsString = '';

  Object.entries(diff).forEach(([key, status]) => {
    if (typeof status === 'object') {
      objAsString += '\n';
      objAsString += setPlain(diff[key], obj1[key], obj2[key], `${prefix}${key}.`);
    }
    switch (status) {
      case 'changed':
        objAsString += `\nProperty '${prefix}${key}' was updated. From ${fillComplexValue(obj1[key])} to ${fillComplexValue(obj2[key])}`;
        break;
      case 'deleted':
        objAsString += `\nProperty '${prefix}${key}' was removed`;
        break;
      case 'added':
        objAsString += `\nProperty '${prefix}${key}' was added with value: ${fillComplexValue(obj2[key])}`;
        break;
      default:
    }
  });

  return objAsString.trim();
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
