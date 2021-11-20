import type { Story } from '@storybook/react/types-6-0';
import { CodeBlock } from '@ui-tools/common';
import { createStoryMeta } from './utils/stories';

export default createStoryMeta({
  title: '_Introduction',
});

const Template: Story = () => {
  return (
    <>
      <h1>UI-KIT</h1>
      <p>
        <a target="_blank" rel="noreferrer" href="https://jestjs.io/docs/using-matchers">
          Repository
        </a>
      </p>
      <CodeBlock title="Install with npm" language="bash">{`npm i --save-dev @ui-tools/components`}</CodeBlock>
      <CodeBlock title="Install witn yarn" language="bash">{`yarn add -D @ui-tools/components`}</CodeBlock>
      <CodeBlock title="Example:">{`import { Button } from '@ui-tools/components';`}</CodeBlock>
      <p></p>
    </>
  );
};

export const Primary = Template.bind({});
