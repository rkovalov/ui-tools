import Button, { Props } from './Button';
import { CodeBlock } from '@ui-tools/common';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';
import { getColorPalette } from '../../styles/colors';

const palette = getColorPalette();

export default createStoryMeta({
  title: 'Button',
  component: Button,
  argTypes: {
    color: {
      options: Object.keys(palette),
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    disabled: Boolean,
    outlined: Boolean,
    secondary: Boolean,
    isLoading: Boolean,
  },
});

const props = `
interface Props {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactElement | React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  color?: ColorName;
  isLoading?: boolean;
  outlined?: boolean;
  secondary?: boolean;
}
`;

const designSpecs = `
<Button color="blue">Primary</Button>
<Button color="black" secondary>Secondary</Button>
<Button color="black" outlined>Outlined</Button>
`;

const Template: Story<Props> = ({ color, secondary, outlined, size, disabled, isLoading, children }) => (
  <div>
    <CodeBlock title="Props">{props}</CodeBlock>
    <hr />
    <CodeBlock title="Design Specs Example">{designSpecs}</CodeBlock>
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px', margin: '30px' }}>
      <Button color="blue">Primary</Button>
      <Button color="black" secondary>
        Secondary
      </Button>
      <Button color="black" outlined>
        Outlined
      </Button>
    </div>
    <hr />

    {/* eslint-disable-next-line max-len */}
    <CodeBlock title="Controlable Button">{`<Button size={size} color={color} secondary={secondary} outlined={outlined} disabled={disabled}>{children}</Button>`}</CodeBlock>
    <Button
      size={size}
      color={color}
      secondary={secondary}
      outlined={outlined}
      disabled={disabled}
      isLoading={isLoading}
    >
      {children}
    </Button>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  color: 'blue',
  secondary: false,
  outlined: false,
  size: 'md',
  children: 'Button',
  disabled: false,
  isLoading: false,
};
