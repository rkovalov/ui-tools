import { CodeBlock } from '@ui-tools/common';
import type { Story } from '@storybook/react/types-6-0';

import { createStoryMeta } from '../../utils/stories';
import Button from '../Button';
import Popover from './';
import type { ColorName } from '../../styles/colors';
import type { Props } from './Popover';
import { getColorPalette } from '../../styles/colors';

const palette = getColorPalette();

export default createStoryMeta({
  title: 'Popover',
  component: Popover,
  argTypes: {
    color: {
      options: Object.keys(palette),
      control: { type: 'select' },
    },
  },
});

const code = `
<Popover triggers={['click', 'hover']} placement="right" offset={0}>
  <Popover.Target>
    <Button>Open by Click and Hover, Right</Button>
  </Popover.Target>
  <Popover.Content color="black">Popover Content</Popover.Content>
</Popover>
`;

const Content = ({ color }: { color?: ColorName | 'white' }) => {
  return (
    <Popover.Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} color={color}>
      Popover Content
    </Popover.Content>
  );
};

const Template: Story<Props & { color?: ColorName | 'white' }> = args => {
  return (
    <>
      <b>Popover</b> Component based on <b>React-Popper</b>,{' '}
      <b>
        <a target="_blank" rel="noreferrer" href="https://popper.js.org/react-popper/">
          docs.
        </a>{' '}
        <br />
      </b>
      <CodeBlock title="Example">{code}</CodeBlock>
      <Popover>
        <Popover.Target>
          <Button>Open by Click</Button>
        </Popover.Target>
        <Content color={args.color} />
      </Popover>
      <br />
      <br />
      <Popover triggers={['hover']}>
        <Popover.Target>
          <Button color="green">Open by Hover</Button>
        </Popover.Target>
        <Content color={args.color} />
      </Popover>
      <br />
      <br />
      <Popover triggers={['click', 'hover']} placement="bottom-start">
        <Popover.Target>
          <Button color="teal">Open by Click and Hover</Button>
        </Popover.Target>
        <Content color={args.color} />
      </Popover>
      <br />
      <br />
      <Popover triggers={['click', 'hover']} placement="right" offset={0}>
        <Popover.Target>
          <Button>Open by Click and Hover, Right</Button>
        </Popover.Target>
        <Content color={args.color} />
      </Popover>
    </>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
