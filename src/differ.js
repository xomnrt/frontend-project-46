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
