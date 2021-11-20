import type { Story } from '@storybook/react/types-6-0';
import { CodeBlock } from '@ui-tools/common';
import { createStoryMeta } from './utils/stories';

export default createStoryMeta({
  title: '_Introduction',
});

const Template: Story = () => {
  return (
    <>
      <h1>Utils</h1>
      <CodeBlock title="Install with npm" language="bash">{`npm i @ui-tools/utils`}</CodeBlock>
      <CodeBlock title="Install witn yarn" language="bash">{`yarn add @ui-tools/utils`}</CodeBlock>
      <p></p>
    </>
  );
};

export const Primary = Template.bind({});
