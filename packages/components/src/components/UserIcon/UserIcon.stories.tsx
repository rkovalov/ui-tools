import UserIcon, { Props } from './UserIcon';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';

export default createStoryMeta({
  title: 'UserIcon',
  component: UserIcon,
  argTypes: {
    firstName: String,
    lastName: String,
    isSelected: Boolean,
    isDisabled: Boolean,
  },
});

const Template: Story<Props> = args => <UserIcon {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  firstName: 'Rudolf',
  lastName: 'Kovalyov',
  isSelected: false,
  isDisabled: false,
};
