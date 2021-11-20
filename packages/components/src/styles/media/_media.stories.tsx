import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';
import { CodeBlock } from '@ui-tools/common';
import { getBreakpoints } from './_media';
// import styles from './_z-index.stories.module.scss';

const breakpoints = getBreakpoints();
export default createStoryMeta({
  title: '_Styles/Media',
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
      <h1>Media</h1>
      <p>
        Please read docs of <b>SASS</b> library which used under the hood{' '}
        <a target="_blank" rel="noreferrer" href="https://eduardoboucas.github.io/include-media/">
          <b>@include-media</b>
        </a>
        .
      </p>
      <br />
      <CodeBlock language="js" title="SASS usage:">
        {`//Available breakpoints \n ${JSON.stringify(breakpoints, null, 2)}`}
      </CodeBlock>
      <CodeBlock language="sass">
        {`@import '~@ui-tools/componets/dist/styles';
        \n\n@include media(">tablet", "<=desktop") {\n  background-color: #bad; \n}`}
      </CodeBlock>
      <CodeBlock language="sass">
        {/* eslint-disable-next-line max-len */}
        {`//Custom usage\n\n@import '~@ui-tools/componets/dist/styles';
        \n\n@include media(">tablet", "<=900px") {\n  background-color: #bad; \n}`}
      </CodeBlock>

      <CodeBlock title="Javascript usage:">{`Under construction. Please wait on new version`}</CodeBlock>
    </>
  );
};

export const Primary = Template.bind({});
