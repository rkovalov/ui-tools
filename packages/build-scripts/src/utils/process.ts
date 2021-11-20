import camelCase from 'just-camel-case';

enum Options {
  OUT_DIR = 'outDir',
}

export const getProcessOptions = (): { [key in Options]?: string | null } => {
  const availableArgs = ['out-dir'];
  const args = process.argv.slice(2);

  const formattedArgs = availableArgs.reduce((acc, arg) => {
    const option = args.find(a => new RegExp(`^--${arg}`).exec(a));
    return {
      ...acc,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      [camelCase(arg)]: option ? option.replace(`--${arg}=`, '') : null,
    };
  }, {});
  return formattedArgs;
};
