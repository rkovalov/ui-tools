import type { Story } from '@storybook/react/types-6-0';
import { CodeBlock } from '@ui-tools/common';
import { createStoryMeta } from '../utils/stories';

export default createStoryMeta({
  title: 'AxiosClient',
});

const codeExample = `
import { createAxiosClient, camelizeKeys, snakelizeKeys } from '@ui-tools/utils';

// Create a new instance of axios with a custom axios config in new file axiosClient.js.
export default createAxiosClient({
  interceptors: {
    response: [],
    request: [(config) => {
      return { ...config, params: snakelizeKeys(config.params) };
    }]
  }
  transformers: {
    response: [camelizeKeys]
    request: [snakelizeKeys]
  }
});
`;

const Template: Story = () => {
  return (
    <>
      <h1>Axios Client</h1>
      <CodeBlock title="How to use">{codeExample}</CodeBlock>
    </>
  );
};

export const Primary = Template.bind({});
