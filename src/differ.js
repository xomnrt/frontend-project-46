function sortedObject(obj) {
  const orderedObj = {};
  Object.keys(obj).sort().forEach((key) => {
    orderedObj[key] = obj[key];
  });

  return orderedObj;
}

export default function genDiff(obj1, obj2) {
  const resultObj = {};

  Object.keys(obj1).forEach((key) => {
    if (!Object.hasOwn(obj2, key)) {
      resultObj[key] = 'deleted';
    }
  });

  Object.entries(obj2).forEach(([key, value]) => {
    if (Object.hasOwn(obj1, key)) {
      resultObj[key] = obj1[key] === value ? 'unchanged' : 'changed';
      return;
    }

    resultObj[key] = 'added';
  });

  return sortedObject(resultObj);
}
