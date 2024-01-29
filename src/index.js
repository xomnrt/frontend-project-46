import formatDiff from './formatter.js';
import parseObjectFromFile from './parser.js';
import genDiff from './differ.js';

export default function compareFiles(filePath1, filePath2, format) {
  const obj1 = parseObjectFromFile(filePath1);
  const obj2 = parseObjectFromFile(filePath2);
  const diff = genDiff(obj1, obj2);
  return formatDiff(diff, obj1, obj2, format);
}
