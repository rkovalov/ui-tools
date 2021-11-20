import StatusBar, { Props } from './StatusBar';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';
import { color } from '../../styles/colors';

export default createStoryMeta({
  title: 'StatusBar',
  component: StatusBar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
});

const Template: Story<Props> = args => <StatusBar {...args} style={{ marginTop: 40 }} />;

export const Primary = Template.bind({});

Primary.args = {
  className: 'any',
  activeStatus: 'Selected',
  statuses: [
    {
      label: 'Stored',
      color: color('blue', 60),
    },
    {
      label: 'Assessed',
      color: color('orange', 70),
    },
    {
      label: 'Selected',
      color: color('green', 80),
    },
    {
      label: 'Arrival',
      color: color('teal', 80),
    },
    {
      label: 'Cleared',
      color: color('lightBlue', 80),
    },
  ],
};
