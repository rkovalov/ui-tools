type Rgb = [number, number, number, number?];

export const isColorDark = (color: string | Rgb): boolean => {
  let rgb: Rgb;

  if (typeof color === 'string') {
    if (color.indexOf('#') !== -1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      rgb = color
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (_m, r: string, g: string, b: string) => `#${r}${r}${g}${g}${b}${b}`
        )
        .substring(1)
        .match(/.{2}/g)!
        .map(x => parseInt(x, 16)) as Rgb;
    } else if (color.indexOf('(') !== -1) {
      rgb = color
        .replace(/\(|\)/g, '')
        .split(',')
        .map(digit => parseInt(digit.trim(), 10)) as Rgb;
    } else {
      throw new Error(`not valid color: ${color}`);
    }
  } else {
    rgb = color;
  }

  const [r, g, b] = rgb;

  return (r * 0.299 + g * 0.587 + b * 0.114) / 256 <= 0.46;
};
