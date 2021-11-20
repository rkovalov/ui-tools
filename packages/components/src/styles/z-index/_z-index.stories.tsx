import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';
import { CodeBlock } from '@ui-tools/common';
// import styles from './_z-index.stories.module.scss';

export default createStoryMeta({
  title: '_Styles/z-index',
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  parameters: {
    info: {
      text: `How to use:`,
    },
  },
});

const Template: Story = () => {
  return (
    <>
      <h1>Z Indexes</h1>
      <br />
      <CodeBlock language="sass" title="SASS usage:">
        {`@import '~@ui-tools/componets/dist/styles';\ndiv {\n  z-index: zIndex(main, tooltip);\n}`}
      </CodeBlock>
      <CodeBlock title="Javascript usage:">
        {`import { zIndex } from '@ui-tools/componets';\nzIndex('main', 'tooltip');`}
      </CodeBlock>
    </>
  );
};

export const Primary = Template.bind({});
