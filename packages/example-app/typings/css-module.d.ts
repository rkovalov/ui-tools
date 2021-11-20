declare module '*.module.css' {
  // const classes: Record<string, string>;
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  // const classes: Record<string, string>;
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.js.scss' {
  // const classes: Record<string, string>;
  const classes: { readonly [key: string]: string };
  export default classes;
}
