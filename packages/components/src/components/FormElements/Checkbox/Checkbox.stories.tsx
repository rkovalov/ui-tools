import { useState, useCallback } from 'react';
import Checkbox, { Props } from './Checkbox';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';

export default createStoryMeta({
  title: 'Form Elements/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
    },
    disabled: Boolean,
  },
});

const Template: Story<Props> = args => {
  const [isChecked, setIsChecked] = useState(false);
  const toggle = useCallback(checked => {
    setIsChecked(checked);
  }, []);

  return (
    <div style={{ width: '50%' }}>
      <Checkbox {...args} checked={isChecked} onChange={toggle} />
    </div>
  );
};

export const Small = Template.bind({});
export const Medium = Template.bind({});
export const Large = Template.bind({});

Small.args = {
  size: 'sm',
  disabled: false,
  intermediate: false,
};

Medium.args = {
  size: 'md',
  disabled: false,
  intermediate: true,
  onChange: () => '',
};

Large.args = {
  size: 'lg',
  disabled: false,
};
