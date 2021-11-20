import { useState, useCallback } from 'react';
import { CodeBlock } from '@ui-tools/common';
import LabeledToggle, { Props } from './LabeledToggle';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';
import type Option from 'react-select/src/components/Option';

export default createStoryMeta({
  title: 'Form Elements/LabeledToggle',
  component: LabeledToggle,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    disabled: Boolean,
  },
});

type Option = {
  value: string;
  label: string;
  type: string;
};

const code = `
const options = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' },
];
<LabeledToggle options={options} value={value} onChange={setValue} />
`;

const options: readonly { label: string; value: string; type: string }[] = [
  { label: 'Option 1', value: 'option-1', type: 'type1' },
  { label: 'Option 2', value: 'option-2', type: 'type2' },
  { label: 'Option 3', value: 'option-3', type: 'type3' },
];

const Template: Story<Props<Option>> = args => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [value, setValue] = useState<Option>(args.options[0]!);

  const onChange = useCallback((option: Option) => {
    setValue(option);
  }, []);
  return (
    <div style={{ width: '50%' }}>
      <CodeBlock title="Example">{code}</CodeBlock>
      <LabeledToggle {...args} value={value} onChange={onChange} />
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  disabled: false,
  options,
};
