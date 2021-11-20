import ClipLoader, { Props } from './ClipLoader';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../../utils/stories';

export default createStoryMeta({
  title: 'Loaders/ClipLoader',
  component: ClipLoader,
});

const Template: Story<Props> = args => <ClipLoader {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
