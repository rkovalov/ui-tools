import FormToggle, { Props } from './FormToggle';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';

export default createStoryMeta({
  title: 'FormToggle',
  component: FormToggle,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    defaultChecked: Boolean,
    disabled: Boolean,
  },
});

const Template: Story<Props> = args => (
  <div>
    <FormToggle {...args} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', gap: '30px' }}>
      <FormToggle {...args} />
      <FormToggle {...args} disabled checked={false} />
    </div>
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  className: 'any',
  size: 'md',
  defaultChecked: true,
  disabled: false,
  title: 'Title',
  description: `Description here using sub paragraph style multi-line text for long descriptions with 1.5 
    line-height Description here using paragraph style multi-line text for long descriptions with 1.5 line-height`,
};
