import type { Story } from '@storybook/react/types-6-0';
import LinkTo from '@storybook/addon-links/react';

import { createStoryMeta } from '../../utils/stories';
import { CodeBlock } from '@ui-tools/common';
// import styles from './_z-index.stories.module.scss';

const { title: IconTitle } = createStoryMeta({ title: 'Icon' });

export default createStoryMeta({
  title: '_Styles/Icons',
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
      <h1>Icons</h1>
      <br />
      <br />
      <h2>
        Icons are generated by <a href="https://icomoon.io/">icomoon</a> web applications
      </h2>
      <CodeBlock title="Javascript usage:">
        {`
        // Global import at once
        \nimport '@ui-tools/components/dist/assets/fonts/wf-icons';
        `}
      </CodeBlock>
      <CodeBlock language="sass" title="SASS usage:">
        {`
        // Global import at once
        \n@import '~@ui-tools/components/dist/assets/fonts/wf-icons';
        `}
      </CodeBlock>
      <CodeBlock language="sass" title="React usage:">
        {`
        // Global import at once
        \n@import '~@ui-tools/components/dist/assets/fonts/wf-icons';
        \n@import { Icon } from '@ui-tools/components';
        \n<Icon name="dashboard" />
        `}
      </CodeBlock>
      {/* @ts-ignore */}
      <LinkTo kind={IconTitle} title="Link to Icon Story" style={{ color: '#1474f3' }}>
        Go to Icon Story
      </LinkTo>
    </>
  );
};

export const WFIcons = Template.bind({});