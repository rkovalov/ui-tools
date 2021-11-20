import { useState } from 'react';
import DatePicker, { Props } from './DatePicker';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';

export default createStoryMeta({
  title: 'Form Elements/DatePicker',
  component: DatePicker,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    locale: {
      options: ['en-GB', 'fr-CA'],
      control: { type: 'select' },
    },
    withTime: Boolean,
    isLoading: Boolean,
    disabled: Boolean,
  },
});

const Template: Story<Props> = args => {
  const [date, setDate] = useState<Date | null | [Date | null, Date | null]>(null);

  return (
    <div style={{ width: '50%' }}>
      <DatePicker {...args} onChange={setDate} value={date} />
    </div>
  );
};

export const Primary = Template.bind({});
export const WithError = Template.bind({});

Primary.args = {
  size: 'lg',
  disabled: false,
};

WithError.args = {
  hasError: true,
  errorMessage: 'Field cannot be blank',
};
