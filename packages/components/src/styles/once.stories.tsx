import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../utils/stories';
import { CodeBlock } from '@ui-tools/common';
// import styles from './_z-index.stories.module.scss';

export default createStoryMeta({
  title: '_Styles/Once',
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
      <h1>Import Once</h1>
      <br />
      <h2>once.scss included:</h2>
      <a rel="noreferrer" target="_blank" href="https://github.com/necolas/normalize.css/">
        https://github.com/necolas/normalize.css/
      </a>
      <CodeBlock title="SASS usage:">{`@import '~@ui-tools/componets/dist/styles/once';`}</CodeBlock>
      <CodeBlock title="Javascript usage:">{`import '@ui-tools/componets/dist/styles/once';`}</CodeBlock>
    </>
  );
};

export const Primary = Template.bind({});
