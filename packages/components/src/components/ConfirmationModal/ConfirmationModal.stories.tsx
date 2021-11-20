import { useState } from 'react';
import { CodeBlock } from '@ui-tools/common';
import type { Story } from '@storybook/react/types-6-0';

import { createStoryMeta } from '../../utils/stories';
import Button from '../Button';
import ConfirmationModal, { ConfirmationModalType } from './';
import type { Props } from './ConfirmationModal';

export default createStoryMeta({
  title: 'ConfirmationModal',
  component: ConfirmationModal,
});

const code = `
const [isOpen, setIsOpen] = useState(false);
const toggle = useCallback(() => {
  setIsOpen(prev => !prev);
}, [setIsOpen]);

return (
  <ConfirmationModal
    isOpen={isDeletionOpen}
    onRequestClose={() => setIsDeletionOpen(false)}
    onAccept={() => setIsDeletionOpen(false)}
    type={ConfirmationModalType.Deletion}
    title="Deletion confirmation">
    Are you sure you want to delete the Mode of Transport?
  </ConfirmationModal>
)

`;

const Template: Story<Props & { withoutExample: boolean }> = ({ withoutExample, ...args }) => {
  const [isDeletionOpen, setIsDeletionOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isAdditionOpen, setIsAdditionOpen] = useState(false);

  return (
    <>
      {!withoutExample && (
        <>
          <b>Modal</b> Component based on <b>React-Modal</b>,{' '}
          <b>
            <a target="_blank" rel="noreferrer" href="http://reactcommunity.org/react-modal/">
              docs.
            </a>{' '}
            (
            <a target="_blank" rel="noreferrer" href="http://reactcommunity.org/react-modal/">
              github
            </a>
            )
            <br />
          </b>
          <CodeBlock title="Example">{code}</CodeBlock>
        </>
      )}

      <Button color="red" onClick={() => setIsDeletionOpen(true)}>
        Trigger Deletion Modal
      </Button>
      <Button color="orange" onClick={() => setIsWarningOpen(true)}>
        Trigger Warning Modal
      </Button>
      <Button color="blue" onClick={() => setIsAdditionOpen(true)}>
        Trigger Addition Modal
      </Button>
      <ConfirmationModal
        {...args}
        isOpen={isDeletionOpen}
        onRequestClose={() => setIsDeletionOpen(false)}
        onAccept={() => setIsDeletionOpen(false)}
        type={ConfirmationModalType.Deletion}
        title="Deletion confirmation"
      >
        Are you sure you want to delete the Mode of Transport?
      </ConfirmationModal>
      <ConfirmationModal
        {...args}
        isOpen={isWarningOpen}
        onRequestClose={() => setIsWarningOpen(false)}
        onAccept={() => setIsWarningOpen(false)}
        type={ConfirmationModalType.Warning}
        title="Warning confirmation"
      >
        The Mode of Transport has been modified by another user. Are you sure you want to update ?
      </ConfirmationModal>
      <ConfirmationModal
        {...args}
        isOpen={isAdditionOpen}
        onRequestClose={() => setIsAdditionOpen(false)}
        onAccept={() => setIsAdditionOpen(false)}
        type={ConfirmationModalType.Addition}
        title="Addition confirmation"
        cancelText="Close"
      >
        Do you want to add the Entity Entity name to your list?
      </ConfirmationModal>
    </>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
