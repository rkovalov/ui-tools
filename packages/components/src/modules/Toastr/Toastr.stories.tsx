import { useCallback } from 'react';
import { CodeBlock } from '@ui-tools/common';
import type { Story } from '@storybook/react/types-6-0';

import { ToastrManager, toastrEmmiter } from './';
import Button from '../../components/Button';

import { createStoryMeta } from '../../utils/stories';

export default createStoryMeta({
  title: 'Modules/Toastr',
  component: ToastrManager,
});

const code = `
import { toastrEmmiter, ToastrManager } from "@ui-tools/components";

const App: React.FunctionComponent = () => {
  const onSuccess = useCallback(() => {
    toastrEmmiter.success('Show successfull toast');
  }, []);
  const onError = useCallback(() => {
    toastrEmmiter.error('Show error toast');
  }, []);
  const onInfo = useCallback(() => {
    toastrEmmiter.info('Show info toast');
  }, []);
  const onConfirm = useCallback(() => {
    toastrEmmiter.confirm('Show error toast', {
      onConfirm: () => {
        console.log('OnConfirm');
      },
      confirmText: 'Confirm and see output in console',
    });
  }, []);
  return (
    <div>
      <ToastrManager />
      <Button onClick={onSuccess}>Show Success Toast</Button>
    </div>
  );
}

`;

const Template: Story = () => {
  const onSuccess = useCallback(() => {
    toastrEmmiter.success('Show successfull toast');
  }, []);
  const onError = useCallback(() => {
    toastrEmmiter.error('Show error toast');
  }, []);
  const onInfo = useCallback(() => {
    toastrEmmiter.info('Show info toast');
  }, []);
  const onConfirm = useCallback(() => {
    toastrEmmiter.confirm('Show error toast', {
      onConfirm: () => {
        console.log('OnConfirm');
      },
      confirmText: 'Confirm and see output in console',
    });
  }, []);
  return (
    <div>
      <ToastrManager />
      <CodeBlock title="Usage">{code}</CodeBlock>
      <Button color="green" onClick={onSuccess}>
        Success Toast
      </Button>
      <hr />
      <Button color="red" onClick={onError}>
        Error Toast
      </Button>
      <hr />
      <Button color="amber" onClick={onConfirm}>
        Confirm Toast
      </Button>
      <hr />
      <Button onClick={onInfo}>Info Toast</Button>
    </div>
  );
};

export const Primary = Template.bind({});
