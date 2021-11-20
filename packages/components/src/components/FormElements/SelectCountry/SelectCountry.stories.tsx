import { useState } from 'react';
import SelectCountry, { Props } from './';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';

export default createStoryMeta({
  title: 'Form Elements/SelectCountry',
  component: SelectCountry,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    isMulti: Boolean,
    disabled: Boolean,
  },
});

interface Option {
  code: string;
  name: string;
  id: string;
  label?: string;
  value?: string;
}

const options = [
  { code: 'fr', name: 'France', id: '1' },
  { code: 'bj', name: 'Benin', id: '2' },
];

const Template: Story<Props<Option>> = args => {
  const [value, setValue] = useState<Option | null>();

  return (
    <div style={{ width: '50%' }}>
      <SelectCountry<Option> {...args} value={value} onChange={setValue} />
    </div>
  );
};
export const Primary = Template.bind({});

Primary.args = {
  size: 'md',
  options,
  disabled: false,
  isMulti: false,
  getOptionLabel: c => c.name,
  getOptionValue: c => c.name,
};
