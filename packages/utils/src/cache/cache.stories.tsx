import type { Story } from '@storybook/react/types-6-0';
import { CodeBlock } from '@ui-tools/common';
import { createStoryMeta } from '../utils/stories';

export default createStoryMeta({
  title: 'Cache',
});

const codeExample = `
import { Cache } from '@ui-tools/utils';
// const cache = new Cache({ expireTime: 5000 }); // automatically clean cache in every 5s
const cache = new Cache();


const params = ['customParam'];
const key = JSON.stringify(params);
cache.add(key, params);

cache.get(key);

cache.delete(key); // delete data by key

cache.clean(); // clean all data in cache object
`;
const Template: Story = () => {
  return (
    <>
      <h1>Cache</h1>
      <CodeBlock title="How to use">{codeExample}</CodeBlock>
    </>
  );
};

export const Primary = Template.bind({});
