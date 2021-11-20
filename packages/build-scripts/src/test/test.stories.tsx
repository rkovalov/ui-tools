import type { Story } from '@storybook/react/types-6-0';
import { CodeBlock } from '@ui-tools/common';
import { createStoryMeta } from '../utils/stories';

export default createStoryMeta({
  title: '_Test',
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  parameters: {
    info: {
      text: `How to use:`,
    },
  },
});

const Template: Story = () => {
  return (
    <>
      <h1>
        Test tools based on <b>Jest</b>
      </h1>
      <p>
        <a target="_blank" rel="noreferrer" href="https://jestjs.io/docs/using-matchers">
          Jest
        </a>{' '}
        is a delightful JavaScript Testing Framework with a focus on simplicity.
      </p>
      <p>
        Jest configured by using{' '}
        <b>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://testing-library.com/docs/react-testing-library/example-intro"
          >
            @testing-library
          </a>
        </b>
      </p>
      <p>
        Included <b>Matchers</b>:<br />
        <a target="_blank" rel="noreferrer" href="https://github.com/jest-community/jest-extended">
          <b>jest-extended</b>
        </a>
        <br />
        <a target="_blank" rel="noreferrer" href="https://github.com/mattphillips/jest-chain">
          <b>jest-chain</b>
        </a>
      </p>
      <p>
        Used user event simulator:
        <br />
        <a target="_blank" rel="noreferrer" href="https://github.com/testing-library/user-event">
          <b>testing-library/user-event</b>
        </a>
      </p>

      <p>
        <b>We dont highly recommend use enzyme in yours project</b>. Instead of accessing the components internal API,
        or evaluating the state, you&apos;ll get more confidence by writing your tests based on the component output.
      </p>
      <CodeBlock title="Install with npm" language="bash">{`npm i --save-dev @ui-tools/build-scripts`}</CodeBlock>
      <CodeBlock title="Install witn yarn" language="bash">{`yarn add -D @ui-tools/build-scripts`}</CodeBlock>
      <CodeBlock title="Setup simply command in existing project:">{`test: "ui-tools-build-scripts test"`}</CodeBlock>
      <CodeBlock title="Run watch mode:">{`test: "ui-tools-build-scripts test --watchAll"`}</CodeBlock>
      <CodeBlock title="Run watch mode by Regexp:">
        {`test: "ui-tools-build-scripts test --watchAll <regexForTestFiles>"`}
      </CodeBlock>
      <p></p>
    </>
  );
};

export const Introduction = Template.bind({});
