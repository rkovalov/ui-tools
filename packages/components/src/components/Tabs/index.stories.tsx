import Tabs from './';
import type { Story } from '@storybook/react/types-6-0';
import { createStoryMeta } from '../../utils/stories';
import { color } from '../../styles/colors';

export default createStoryMeta({
  title: 'Tabs',
  component: Tabs,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: color('gray', 10) }],
    },
  },
});

const Template: Story = () => (
  <Tabs>
    <Tabs.TabList>
      <Tabs.Tab>Transport</Tabs.Tab>
      <Tabs.Tab count="10">Documents</Tabs.Tab>
      <Tabs.Tab hasError count="2">
        Items
      </Tabs.Tab>
      <Tabs.Tab disabled>Containers</Tabs.Tab>
    </Tabs.TabList>
    <Tabs.TabPanel>
      <h3>Transports</h3>
    </Tabs.TabPanel>
    <Tabs.TabPanel>
      <h3>Documents</h3>
    </Tabs.TabPanel>
    <Tabs.TabPanel>
      <h3>Items</h3>
    </Tabs.TabPanel>
    <Tabs.TabPanel>
      <h3>Containers</h3>
    </Tabs.TabPanel>
  </Tabs>
);

export const Primary = Template.bind({});

Primary.args = {
  className: 'tabs',
};
