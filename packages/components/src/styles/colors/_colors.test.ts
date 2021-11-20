import { getColorPalette } from './_colors';

// Note: this will fail
jest.mock(
  './_colors.js.scss',
  () => ({
    'color(black)': 'black',
    'color(black,20)': 'black-20',
    'color(blue)': 'blue',
    'color(blue,20)': 'blue-20',
  }),
  { virtual: true }
);

it('Color Palette is correct calculated', () => {
  const palette = getColorPalette();
  expect(palette).toEqual({ black: { base: 'black', '20': 'black-20' }, blue: { base: 'blue', '20': 'blue-20' } });
});
