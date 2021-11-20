import BeatLoader, { Props } from './BeatLoader';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';

export default createStoryMeta({
  title: 'Loaders/BeatLoader',
  component: BeatLoader,
});

const Template: Story<Props> = args => <BeatLoader {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
