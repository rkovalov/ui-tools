import Toggle, { Props } from './Toggle';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';

export default createStoryMeta({
  title: 'Toggle',
  component: Toggle,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    defaultChecked: Boolean,
    disabled: Boolean,
  },
});

const Template: Story<Props> = args => <Toggle {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  className: 'any',
  size: 'md',
  defaultChecked: true,
  disabled: false,
};
