import Tag, { Props } from './Tag';
import type { Story } from '@storybook/react/types-6-0';
import { getColorPalette } from '../../styles/colors';
import { createStoryMeta } from '../../utils/stories';

const palette = getColorPalette();

export default createStoryMeta({
  title: 'Tag',
  component: Tag,
  argTypes: {
    color: {
      options: Object.keys(palette),
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    outlined: Boolean,
    backgroundColor: {
      options: Object.keys(palette),
      control: { type: 'select' },
    },
  },
});

const Template: Story<Props> = args => <Tag {...args} />;

export const Primary = Template.bind({});
export const Outlined = Template.bind({});

Primary.args = {
  className: 'any',
  children: 'IM4',
};

Outlined.args = {
  outlined: true,
  children: 'Approved',
};
