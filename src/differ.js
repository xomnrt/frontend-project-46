// obj = {
//     timeout: 'changed',
//     verbose: 'added',
//     follow: 'deleted',
//     host: 'unchanged',
//     proxy: 'deleted',
// };
// return = {
//     follow: 'deleted',
//     host: 'unchanged',
//     proxy: 'deleted',
//     timeout: 'changed',
//     verbose: 'added',
// }
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
    .map((key) => [key, 'deleted']);

  const addedEntries = Object.keys(obj2)
    .filter((key) => !Object.hasOwn(obj1, key))
    .map((key) => [key, 'added']);

  const unchangedEntries = Object.keys(obj1)
    .filter((key) => Object.hasOwn(obj2, key) && obj1[key] === obj2[key])
    .map((key) => [key, 'unchanged']);

  const changedEntries = Object.keys(obj1)
    .filter((key) => Object.hasOwn(obj2, key) && obj1[key] !== obj2[key])
    .map((key) => {
      if (
        (typeof obj1[key] === 'object' && obj1[key] !== null)
        && (typeof obj2[key] === 'object' && obj2[key] !== null)) {
        return [key, genDiff(obj1[key], obj2[key])];
      }
      return [key, 'changed'];
    });

  const entries = [...deletedEntries, ...addedEntries, ...unchangedEntries, ...changedEntries];
  const res = Object.fromEntries(entries);
  return sortedObject(res);
}
