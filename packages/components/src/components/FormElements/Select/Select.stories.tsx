import { useState } from 'react';
import Select, { Props } from './';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';

export default createStoryMeta({
  title: 'Form Elements/Select',
  component: Select,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    isClearable: Boolean,
    isLoading: Boolean,
    isMulti: Boolean,
    disabled: Boolean,
  },
});

const defaultOptions = Array.from({ length: 20 }, (_, i) => ({
  label: `Option with Long Long Long Long description, Long Long Long Long description  ${i}`,
  value: `Option-${i}`,
}));

type OptionType = typeof defaultOptions[0];

const Template: Story<Props<OptionType> | Props<OptionType, true>> = props => {
  const [singleValue, setSingleValue] = useState<OptionType | null>(null);
  const [multiValue, setMultiValue] = useState<OptionType[] | null>(null);

  const onChangeMulti = (options: readonly OptionType[]) => {
    setMultiValue(options as OptionType[]);
  };

  return (
    <div style={{ width: '50%' }}>
      {props.isMulti && <Select<OptionType, true> {...props} value={multiValue} onChange={onChangeMulti} />}

      {props.isMulti === false && <Select {...props} value={singleValue} onChange={setSingleValue} />}
    </div>
  );
};

export const Primary = Template.bind({});
export const OptionsWithTags = Template.bind({});
export const WithError = Template.bind({});

Primary.args = {
  isLoading: false,
  isMulti: false,
  isClearable: true,
  options: defaultOptions,
  disabled: false,
};

OptionsWithTags.args = {
  isLoading: false,
  isMulti: false,
  options: defaultOptions.map((o, i) => ({ ...o, tag: { label: 10000 + i } })),
  disabled: false,
};

WithError.args = {
  hasError: true,
  isMulti: false,
  options: defaultOptions,
  isLoading: false,
  errorMessage: 'Field cannot be blank',
};
