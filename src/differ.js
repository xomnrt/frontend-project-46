/* eslint-disable no-restricted-syntax */
function sortedObject(obj) {
  const orderedObj = {};
  Object.keys(obj).sort().forEach((key) => {
    orderedObj[key] = obj[key];
  });

  return orderedObj;
}

export default function genDiff(obj1, obj2) {
  const obj = {};

  Object.keys(obj1).forEach((key) => {
    if (!Object.hasOwn(obj2, key)) {
      obj[key] = 'deleted';
    }
  });

  for (const [key, value] of Object.entries(obj2)) {
    if (Object.hasOwn(obj1, key)) {
      if (
        (typeof obj1[key] === 'object' && obj1[key] !== null)
        && (typeof value === 'object' && value !== null)
      ) {
        const newDiff = genDiff(obj1[key], value);

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
