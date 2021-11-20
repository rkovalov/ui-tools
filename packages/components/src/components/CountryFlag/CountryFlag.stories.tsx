import CountryFlag, { Props } from './CountryFlag';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';

export default createStoryMeta({
  title: 'CountryFlag',
  component: CountryFlag,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
});

const Template: Story<Props> = args => <CountryFlag {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  className: 'any',
  code: 'fr',
  label: 'fr',
};
