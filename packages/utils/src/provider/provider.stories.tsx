import type { Story } from '@storybook/react/types-6-0';
import { CodeBlock } from '@ui-tools/common';
import { createStoryMeta } from '../utils/stories';

export default createStoryMeta({
  title: 'Provider',
});

const codeExample = `
// API
/**
 * Wrapped fetcher by Promise.
 *
 * @param {function} fetcher - function which returns promise
 * @param {object} [options = {}]
 * @param {number} options.cacheTime - time (milliseconds) during which result of next execution takes from cache
 * @return {(...params): CancellablePromise}
 */
createProvider(fetcher, options);

// Usage
import { createProvider } from '@ui-tools/utils';

const fetchEntity = createProvider(({ id }) =>
  axiosClient.get('/url-path/{id}').then(res => ({ ...res, data: normalizeData(data) }))
);
const promise = fetchEntity({ id: 1 });

// Cancellation
promise.cancel();
promise.catch(({ isCancelled }) => {
  if(isCancelled) {
    console.log('Promise of Request was cancelled')
  }
})

// Mock Request
const mockData = { name: 'mockName' };
coonst cleanMock = fetchEntity.mock(
  { data: mockData, statusCode: 200 },
  { id: 1 }
);
const promise = fetchEntity({ id: 1 }); // return mockData with 200 status

// Dynamically Mocker
const cleanMock = fetchEntity.setMocker(params => {
  if (params.id === 1) {
    return {
      data: mockData,
      statusCode: params.id === 1 ? 200 : 500,
    }
  }
  return { statusCode: 500 };
});

const promise = fetchEntity({ id: 1 });

// Clean Mock
// useful for test
cleanMock()
`;

const Template: Story = () => {
  return (
    <>
      <h1>Data Provider</h1>
      <CodeBlock title="How to use">{codeExample}</CodeBlock>
    </>
  );
};

export const Primary = Template.bind({});
