import * as Exported from './';

describe('Exporting from components index', () => {
  it('Everything must be re-exported', () => {
    expect(Exported).not.toBe(undefined);
    expect(Exported.color).not.toBe(undefined);
    expect(Exported.Checkbox).not.toBe(undefined);
    expect(Exported.Tag).not.toBe(undefined);
    expect(Exported.Popover).not.toBe(undefined);
    expect(Exported.getColorPalette).not.toBe(undefined);
    expect(Exported.toastrEmmiter).not.toBe(undefined);
  });
});
