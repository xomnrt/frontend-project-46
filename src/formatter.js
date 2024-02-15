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

function setStylish(diff, depth = 2) {
  const lines = Object.entries(diff).map(([field, diffState]) => {
    if (diffState.state === 'changed' && Object.hasOwn(diffState, 'fields')) {
      return `${pad.repeat(depth)}${field}: ${setStylish(diffState.fields, depth + 2)}`;
    }
    switch (diffState.state) {
      case 'unchanged':
        return `${pad.repeat(depth)}${field}: ${printUnchanged(diffState.value, depth + 2)}`;
      case 'changed':
        return `${pad.repeat(depth - 1)}- ${field}: ${printUnchanged(diffState.oldValue, depth + 2)}\n${pad.repeat(depth - 1)}+ ${field}: ${printUnchanged(diffState.newValue, depth + 2)}`;
      case 'deleted':
        return `${pad.repeat(depth - 1)}- ${field}: ${printUnchanged(diffState.oldValue, depth + 2)}`;
      case 'added':
        return `${pad.repeat(depth - 1)}+ ${field}: ${printUnchanged(diffState.newValue, depth + 2)}`;
      default:
        throw new Error(`bad diffState ${diffState.state}`);
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

function setPlain(diff, prefix = '') {
  const lines = Object.entries(diff)
    .filter(([, status]) => status.state !== 'unchanged')
    .map(([key, status]) => {
      if (status.state === 'changed' && Object.hasOwn(status, 'fields')) {
        return setPlain(status.fields, `${prefix}${key}.`);
      }
      switch (status.state) {
        case 'changed':
          return `Property '${prefix}${key}' was updated. From ${fillComplexValue(status.oldValue)} to ${fillComplexValue(status.newValue)}`;
        case 'deleted':
          return `Property '${prefix}${key}' was removed`;
        case 'added':
          return `Property '${prefix}${key}' was added with value: ${fillComplexValue(status.newValue)}`;
        default:
          throw new Error(`bad status ${status.state}`);
      }
    });

  const objAsString = [...lines].join('\n');

  return objAsString.trim();
}

export default function formatDiff(diff, format) {
  switch (format) {
    case 'json':
      return JSON.stringify(diff, null, '  ');
    case 'plain':
      return setPlain(diff);
    case 'stylish':
      return setStylish(diff);
    default:
      throw new Error(`incorrect format ${JSON.stringify(format)}`);
  }
}
