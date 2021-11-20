export function jsonMerge(buffer, object) {
  // copy-webpack-plugin passes a buffer
  const parsedJson = JSON.parse(buffer.toString());
  return JSON.stringify({ ...parsedJson, ...object }, null, 2);
}

export function addTrailingSlash(url = '/') {
  if (url.substr(-1) !== '/') return `${url}/`;
  return url;
}
