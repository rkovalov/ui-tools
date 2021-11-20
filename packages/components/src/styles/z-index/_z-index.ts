import zIndexes from './_z-index.js.scss';

export const zIndex = (...layers: string[]): number | undefined => {
  const key = layers.join('-');
  const index = Number(zIndexes[key]);
  if (!index) {
    console.log(
      `%c zIndex is undefined. "${key}" is not part of the elevation map ${JSON.stringify(zIndexes, null, 2)}`,
      'font-weight: bold; color: red'
    );
  }
  return isNaN(index) ? undefined : index;
};
