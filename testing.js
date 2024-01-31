/* eslint-disable no-restricted-syntax */
import formatDiff from './src/formatter.js';

function sortedObject(obj) {
  const orderedObj = {};
  Object.keys(obj).sort().forEach((key) => {
    orderedObj[key] = obj[key];
  });

  return orderedObj;
}

function genDiff(obj1, obj2) {
  const obj = {};

  for (const key of Object.keys(obj1)) {
    if (!Object.hasOwn(obj2, key)) {
      obj[key] = 'deleted';
    }
  }

  for (const [key, value] of Object.entries(obj2)) {
    if (Object.hasOwn(obj1, key)) {
      if (
        (typeof obj1[key] === 'object' && obj1[key] !== null)
        && (typeof value === 'object' && value !== null)
      ) {
        const newDiff = genDiff(obj1[key], value);

        // const changed = Object.values(newDiff)
        //   .findIndex((subvalue) => subvalue !== 'unchanged') > 0;

        // obj[key] = changed ? newDiff : 'unchanged';
        obj[key] = newDiff;
      } else {
        obj[key] = obj1[key] === value ? 'unchanged' : 'changed';
      }
    }
    if (!Object.hasOwn(obj1, key)) {
      obj[key] = 'added';
    }
  }
  return sortedObject(obj);
}

const obj1 = {
  common: {
    setting1: 'Value 1',
    setting2: 200,
    setting3: true,
    setting6: {
      key: 'value',
      doge: {
        wow: '',
      },
    },
  },
  group1: {
    baz: 'bas',
    foo: 'bar',
    nest: {
      key: 'value',
    },
  },
  group2: {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
};

const obj2 = {
  common: {
    follow: false,
    setting1: 'Value 1',
    setting3: null,
    setting4: 'blah blah',
    setting5: {
      key5: 'value5',
    },
    setting6: {
      key: 'value',
      ops: 'vops',
      doge: {
        wow: 'so much',
      },
    },
  },
  group1: {
    foo: 'bar',
    baz: 'bars',
    nest: 'str',
  },
  group3: {
    deep: {
      id: {
        number: 45,
      },
    },
    fee: 100500,
  },
};

const diff = genDiff(obj1, obj2);
// console.log(JSON.stringify(diff, null, '  '));

console.log(formatDiff(diff, obj1, obj2, 'stylish'));

// function setStylish(diff, obj1, obj2) {
//   let objAsString = '{';

//   Object.entries(diff).forEach(([field, diffState]) => {
//     console.log(field, diffState);
//     switch (diffState) {
//       case 'unchanged':
//         objAsString += `\n  ${field}: ${obj1[field]}`;
//         break;
//       case 'changed':
//         objAsString += `\n  - ${field}: ${obj1[field]}`;
//         objAsString += `\n  + ${field}: ${obj2[field]}`;
//         break;
//       case 'deleted':
//         objAsString += `\n  - ${field}: ${obj1[field]}`;
//         break;
//       case 'added':
//         objAsString += `\n  + ${field}: ${obj2[field]}`;
//         break;
//       default:
//         if (typeof diffState !== 'object') {
//           throw new Error(`Wrong diffState ${JSON.stringify(diffState)}`);
//         }

//         objAsString += setStylish(diffState, obj1[field], obj2[field]);
//     }
//   });

//   objAsString += '\n}';

//   return objAsString;
// }
