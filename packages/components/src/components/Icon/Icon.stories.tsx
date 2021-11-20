import type { Story } from '@storybook/react/types-6-0';
import { CodeBlock } from '@ui-tools/common';

import selectionJson from '../../assets/fonts/wf-icons/selection.json';

import Icon, { Props, IconName } from './Icon';
import { createStoryMeta } from '../../utils/stories';

export default createStoryMeta({
  title: 'Icon',
  component: Icon,
  argTypes: {
    color: {
      control: { type: 'color' },
    },
    hoverColor: {
      control: { type: 'color' },
    },
    isSpin: Boolean,
  },
});

const Template: Story<Props> = args => {
  // console.log for copy union type
  // console.log(selectionJson.icons.map(i => `'${i.properties?.name}'`).join('|'), 'selectionJson');
  return (
    <>
      <CodeBlock>{'<Icon name="dashboard" color="#6d849b" hoverColor="#6d849b" />'}</CodeBlock>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {/* ICON */}
        {selectionJson?.icons?.map((i: { properties: { name: string } }) => {
          return (
            <div
              key={i.properties?.name}
              style={{
                width: 140,
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#6d849b',
              }}
            >
              <Icon {...args} name={i.properties?.name as IconName} size={20} style={{ marginBottom: 4 }} />
              {i.properties?.name}
            </div>
          );
        })}
      </div>
    </>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  isSpin: false,
};
