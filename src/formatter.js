const pad = '  ';

function printUnchanged(valueToPrint, depth) {
  if (valueToPrint === null || typeof valueToPrint !== 'object') {
    return `${valueToPrint}`;
  }

  const entries = Object.entries(valueToPrint);

  const lines = entries.map(([key, value]) => `${pad.repeat(depth)}${key}: ${printUnchanged(value, depth + 2)}`);

  const unchandedPart = ['{', ...lines, `${pad.repeat(depth - 2)}}`].join('\n');

  return unchandedPart;
}

function setStylish(diff, obj1, obj2, depth = 2) {
  const lines = Object.entries(diff).map(([field, diffState]) => {
    if (typeof diffState === 'object') {
      return `${pad.repeat(depth)}${field}: ${setStylish(diffState, obj1[field], obj2[field], depth + 2)}`;
    }
    switch (diffState) {
      case 'unchanged':
        return `${pad.repeat(depth)}${field}: ${printUnchanged(obj1[field], depth + 2)}`;
      case 'changed':
        return `${pad.repeat(depth - 1)}- ${field}: ${printUnchanged(obj1[field], depth + 2)}\n${pad.repeat(depth - 1)}+ ${field}: ${printUnchanged(obj2[field], depth + 2)}`;
      case 'deleted':
        return `${pad.repeat(depth - 1)}- ${field}: ${printUnchanged(obj1[field], depth + 2)}`;
      case 'added':
        return `${pad.repeat(depth - 1)}+ ${field}: ${printUnchanged(obj2[field], depth + 2)}`;
      default:
        throw new Error(`bad diffState ${diffState}`);
    }
  });

  const objAsString = ['{', ...lines, `${pad.repeat(depth - 2)}}`].join('\n');

  return objAsString;
}

function fillComplexValue(valueToPrint) {
  if (typeof valueToPrint === 'string') {
    return `'${valueToPrint}'`;
  }
  if (typeof valueToPrint === 'object' && valueToPrint !== null) {
    return '[complex value]';
  }
  return `${valueToPrint}`;
}

function setPlain(diff, obj1, obj2, prefix = '') {
  const lines = Object.entries(diff)
    .filter(([key]) => diff[key] !== 'unchanged')
    .map(([key, status]) => {
      if (typeof status === 'object') {
        return setPlain(diff[key], obj1[key], obj2[key], `${prefix}${key}.`);
      }
      switch (status) {
        case 'changed':
          return `Property '${prefix}${key}' was updated. From ${fillComplexValue(obj1[key])} to ${fillComplexValue(obj2[key])}`;
        case 'deleted':
          return `Property '${prefix}${key}' was removed`;
        case 'added':
          return `Property '${prefix}${key}' was added with value: ${fillComplexValue(obj2[key])}`;
        default:
          throw new Error(`bad status ${status}`);
      }
    });

  const objAsString = [...lines].join('\n');

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
      throw new Error(`incorrect format ${JSON.stringify(format)}`);
  }
}
