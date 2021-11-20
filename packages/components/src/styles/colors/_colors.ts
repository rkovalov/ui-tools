import colors from './_colors.js.scss';

export type ColorName =
  | 'black'
  | 'gray'
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'lightBlue'
  | 'purple'
  | 'amber'
  | 'teal';
export type ColorTone = 'base' | 0 | 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;
export type Palette = {
  [key in ColorName]: { [key in ColorTone]: string };
};

const createPalette = (): Palette => {
  const regexp = /color\((\w+),?(\d+)?\)/g;

  return Object.keys(colors).reduce((acc, key) => {
    const [, colorName, tone] = [...key.matchAll(regexp)][0] ?? [];
    if (colorName) {
      acc[colorName as ColorName] = { ...(acc[colorName as ColorName] || {}), [tone ?? 'base']: colors[key] };
    }
    return acc;
  }, {} as Palette);
};

const palette = createPalette();

export const getColorPalette = (): Palette => {
  return palette;
};

export const color = (name: ColorName, tone: ColorTone = 0): string => {
  // default value set like 0, for correct parse by typescript as number
  // 0 === 'base' of color

  const key = [0, 'base'].includes(tone) ? `color(${name})` : `color(${name},${tone})`;

  const color = colors[key];
  if (!color && process.env.NODE_ENV !== 'test') {
    console.log(`%c Color "${name}" with tone "${tone} is not present in palete"`, 'font-weight: bold; color: red');
  }
  return colors[key] as string;
};

export const isColorFromPalette = (color: ColorName | string): color is ColorName => {
  return Boolean(palette[color as ColorName]);
};
