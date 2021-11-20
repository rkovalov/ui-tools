import { merge } from './merge';

describe('Merge objects', () => {
  it('Merge Correctly', () => {
    const obj1 = {
      name: 'Obj1',
      code: 'codeObj1',
      initialArray: undefined,
      nested: [{ name: 'item1' }],
    };
    const obj2 = {
      newKey: 'newKey',
      initialArray: [],
      nested: {
        items: [{ name: 'item2' }, { name: 'item3' }],
      },
    };

    expect(merge({}, obj2)).toStrictEqual(obj2);
    expect(merge(obj1, obj2)).toStrictEqual({
      name: 'Obj1',
      code: 'codeObj1',
      newKey: 'newKey',
      initialArray: [],
      nested: {
        items: [{ name: 'item2' }, { name: 'item3' }],
      },
    });
  });
});
