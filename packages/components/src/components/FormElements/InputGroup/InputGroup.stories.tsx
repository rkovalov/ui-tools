import InputGroup, { Props } from './InputGroup';
import { CodeBlock } from '@ui-tools/common';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';

export default createStoryMeta({
  title: 'Form Elements/InputGroup',
  component: InputGroup,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    disabled: Boolean,
  },
});

const code = `
<InputGroup size="lg">
  <InputGroup.Item>KG</InputGroup.Item>
  <InputGroup.Input placeholder="Input..." />
  <InputGroup.Select options={options} placeholder="Select..." />
  <InputGroup.Item>any other component</InputGroup.Item>
  <InputGroup.Button>Action</InputGroup.Button>
</InputGroup>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: Story<Props & { options: any[] }> = ({ options, ...args }) => {
  return (
    <div style={{ width: '50%' }}>
      <CodeBlock title="Example">{code}</CodeBlock>
      <InputGroup {...args}>
        <InputGroup.Item>KG</InputGroup.Item>
        <InputGroup.Input placeholder="Input..." />
        <InputGroup.Select options={options} placeholder="Select..." />
        <InputGroup.Item>any other component</InputGroup.Item>
        <InputGroup.Button>Action</InputGroup.Button>
      </InputGroup>
      <br />
      <br />
      <InputGroup {...args}>
        <InputGroup.Item>KG</InputGroup.Item>
        <InputGroup.Input placeholder="Input..." />
      </InputGroup>
      <br />
      <br />
      <InputGroup {...args}>
        <InputGroup.Input placeholder="Input..." />
        <InputGroup.Item align="right">KG</InputGroup.Item>
      </InputGroup>
      <br />
      <br />
      <InputGroup {...args}>
        <InputGroup.Item>value</InputGroup.Item>
        <InputGroup.Item align="right">KG</InputGroup.Item>
      </InputGroup>
      <br />
      <br />
      <InputGroup {...args}>
        <InputGroup.Input placeholder="Input..." />
        <InputGroup.Button color="teal">Action</InputGroup.Button>
      </InputGroup>
      <br />
      <br />
      <InputGroup {...args}>
        <InputGroup.Input placeholder="Input..." />
        <InputGroup.SelectCountry options={options} placeholder="Select Country..." />
      </InputGroup>
    </div>
  );
};

export const Options = Template.bind({});

Options.args = {
  size: 'md',
  options: [
    { label: 'Option 1', value: 'Option1', code: 'bj', name: 'Benin' },
    { label: 'Option 2', value: 'Option2', code: 'ci', name: 'CI' },
  ],
  disabled: false,
  hasError: false,
  errorMessage: '',
};
