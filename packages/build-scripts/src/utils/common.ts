export const addTrailingSlash = (url = '/'): string => {
  if (url.substr(-1) !== '/') return `${url}/`;
  return url;
};
