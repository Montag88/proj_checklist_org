export default function deepCopy(obj) {
  const copy = JSON.parse(JSON.stringify(obj));
  return copy;
}
