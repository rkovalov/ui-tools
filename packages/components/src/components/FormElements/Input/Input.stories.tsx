import Input, { Props } from './Input';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';

export default createStoryMeta({
  title: 'Form Elements/Input',
  component: Input,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    icon: {
      options: [<span key="1">icon</span>, undefined],
      control: { type: 'select' },
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
    isLoading: Boolean,
    disabled: Boolean,
    textarea: Boolean,
  },
});

const Template: Story<Props> = args => (
  <div style={{ width: '50%' }}>
    <Input {...args} />
  </div>
);

export const Number = Template.bind({});
export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});
export const WithError = Template.bind({});

Number.args = {
  type: 'number',
  disabled: false,
  isLoading: false,
  icon: undefined,
  onChange: () => '',
  textarea: false,
};

Medium.args = {
  size: 'md',
  isLoading: true,
  disabled: false,
  onChange: () => '',
  textarea: false,
};
Small.args = {
  size: 'sm',
  isLoading: false,
  disabled: false,
  textarea: false,
};
Large.args = {
  size: 'lg',
  disabled: false,
  textarea: false,
};

WithError.args = {
  hasError: true,
  errorMessage: 'Field cannot be blank',
  textarea: false,
};
