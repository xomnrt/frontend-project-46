/* eslint-disable no-restricted-syntax */
export default function genDiff(obj1, obj2) {
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

        const changed = Object.values(newDiff)
          .findIndex((subvalue) => subvalue !== 'unchanged') > 0;

        obj[key] = changed ? newDiff : 'unchanged';
      } else {
        obj[key] = obj1[key] === value ? 'unchanged' : 'changed';
      }
    }
    if (!Object.hasOwn(obj1, key)) {
      obj[key] = 'added';
    }
  }
  return obj;
}
