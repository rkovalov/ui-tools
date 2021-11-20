declare module 'just-camel-case' {
  type CamelCaseFn = (string: string) => string;

  const camelCase: CamelCaseFn;

  export = camelCase;
}
