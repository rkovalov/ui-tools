import type { Story } from '@storybook/react/types-6-0';
import ColorSwatch from '../../components/ColorSwatch';
import { CodeBlock } from '@ui-tools/common';
import { isColorDark } from '@ui-tools/utils';

import { createStoryMeta } from '../../utils/stories';
import { color, getColorPalette } from './_colors';
import type { ColorName, ColorTone } from './_colors';

import styles from './_colors.stories.module.scss';

const palette = getColorPalette();

export default createStoryMeta({
  title: '_Styles/Colors',
});

const Template: Story = () => {
  return (
    <>
      <h1>Palette Colors</h1>
      <CodeBlock title="SASS usage:">
        {`@import '~@ui-tools/componets/dist/styles';\ndiv {\n  color: color(gray,80); \n}`}
      </CodeBlock>
      <CodeBlock title="Javascript usage:">
        {`import {color} from '@ui-tools/components';\nconst color = color('gray', 80);`}
      </CodeBlock>

      <p>Below you may find details on how to use the color function.</p>
      <p>
        Copy <b>sass</b> or <b>javascript</b> function notation:
      </p>
      <div className={styles.palette}>
        {(Object.keys(palette) as ColorName[]).map(colorName => (
          <div className={styles.colorLine} key={colorName}>
            <div className={styles.colorTitle}>{colorName}</div>
            {(Object.keys(palette[colorName]) as ColorTone[]).reverse().map(tone => {
              const colorHex = color(colorName, tone);
              return (
                <ColorSwatch
                  key={`${colorName} + ${tone}`}
                  className={styles.colorSwatch}
                  name={`color(${colorName}${tone === 'base' ? '' : `,${tone}`})`}
                  hex={colorHex}
                  style={{
                    color: isColorDark(colorHex) ? color('gray', 5) : color('black'),
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export const Primary = Template.bind({});
