import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';
import { CodeBlock } from '@ui-tools/common';
// import styles from './_z-index.stories.module.scss';

export default createStoryMeta({
  title: '_Styles/Fonts',
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  parameters: {
    info: {
      text: `How to use:`,
    },
  },
});

const availablePlaceholder = `
$defaultFont: lato, Helvetica, Arial, Verdana, Tahoma, sans-serif;
%font-thin {
  font-family: proxima-nova-regular, $defaultFont;
}
%font-light {
  font-family: proxima-nova-light, $defaultFont;
}
%font-regular {
  font-family: proxima-nova-regular, $defaultFont;
}
%font-medium {
  font-family: proxima-nova-medium, $defaultFont;
}
%font-semi-bold {
  font-family: proxima-nova-semi-bold, $defaultFont;
}
%font-bold {
  font-family: proxima-nova-bold, $defaultFont;
}
%font-extra-bold {
  font-family: proxima-nova-extra-bold, $defaultFont;
}
%font-black {
  font-family: proxima-nova-black, $defaultFont;
}`;

const Template: Story = () => {
  return (
    <>
      <h1>Fonts</h1>
      <br />
      <br />
      <h2>Available Placeholder Selectors</h2>
      <CodeBlock title="Javascript usage:">
        {`
        // Global import at once
        \nimport '@ui-tools/componets/dist/assets/fonts/proxima-nova';
        `}
      </CodeBlock>
      <CodeBlock language="sass" title="Available Placeholder Selectors:">
        {availablePlaceholder}
      </CodeBlock>
      <CodeBlock language="sass" title="SASS usage:">
        {`
        // Global import at once
        \n@import '~@ui-tools/componets/dist/assets/fonts/proxima-nova';
        `}
      </CodeBlock>
      <CodeBlock language="sass">{`@import '~@ui-tools/componets/dist/styles';
      \nh1 {\n @extend %font-regular;\n}`}</CodeBlock>
    </>
  );
};

export const ProximaNova = Template.bind({});
