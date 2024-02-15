function sortedObject(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .toSorted((a, b) => {
        const aKey = a[0];
        const bKey = b[0];

        if (aKey === bKey) {
          return 0;
        }

        return aKey < bKey ? -1 : 1;
      })
      .map(([key, value]) => [
        key,
        typeof value === 'object' && value !== null ? sortedObject(value) : value,
      ]),
  );
}

export default function genDiff(obj1, obj2) {
  const deletedEntries = Object.keys(obj1)
    .filter((key) => !Object.hasOwn(obj2, key))
    .map((key) => [key, { state: 'deleted', oldValue: obj1[key] }]);

  const addedEntries = Object.keys(obj2)
    .filter((key) => !Object.hasOwn(obj1, key))
    .map((key) => [key, { state: 'added', newValue: obj2[key] }]);

  const unchangedEntries = Object.keys(obj1)
    .filter((key) => Object.hasOwn(obj2, key) && obj1[key] === obj2[key])
    .map((key) => [key, { state: 'unchanged', value: obj1[key] }]);

  const changedEntries = Object.keys(obj1)
    .filter((key) => Object.hasOwn(obj2, key) && obj1[key] !== obj2[key])
    .map((key) => {
      if (
        (typeof obj1[key] === 'object' && obj1[key] !== null)
        && (typeof obj2[key] === 'object' && obj2[key] !== null)) {
        return [key, { state: 'changed', fields: genDiff(obj1[key], obj2[key]) }];
      }
      return [key, { state: 'changed', oldValue: obj1[key], newValue: obj2[key] }];
    });

  const entries = [...deletedEntries, ...addedEntries, ...unchangedEntries, ...changedEntries];
  const res = Object.fromEntries(entries);
  return sortedObject(res);
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

console.log(JSON.stringify(genDiff(obj1, obj2), null, '\t'));
