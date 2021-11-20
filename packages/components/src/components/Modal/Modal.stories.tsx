import { useState, useCallback } from 'react';
import { CodeBlock } from '@ui-tools/common';
import type { Story } from '@storybook/react/types-6-0';

import { createStoryMeta } from '../../utils/stories';
import Button from '../Button';
import Modal from './';
import type { Props } from './Modal';

export default createStoryMeta({
  title: 'Modal',
  component: Modal,
});

const code = `
const [isOpen, setIsOpen] = useState(false);
const toggle = useCallback(() => {
  setIsOpen(prev => !prev);
}, [setIsOpen]);

return (
  <Modal isOpen={isOpen} onRequestClose={toggle}>
    <Modal.Header>
      <Modal.Title>Modal</Modal.Title>
    </Modal.Header>
    <Modal.Separator />
    <Modal.Content>
      Content
    </Modal.Content>
    <Modal.Separator />
    <Modal.Footer>
      <Button onClick={toggle} color="gray">
        Close
      </Button>
    </Modal.Footer>
  </Modal>
)

`;

const Template: Story<Props & { withoutExample: boolean }> = ({ withoutExample, ...args }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [setIsOpen]);

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

      <Button onClick={toggle}>Trigger Modal</Button>
      <Modal {...args} isOpen={isOpen} onRequestClose={toggle}>
        <Modal.Header>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Separator />
        <Modal.Content>
          <Template {...args} withoutExample />
        </Modal.Content>
        <Modal.Separator />
        <Modal.Footer>
          <Button onClick={toggle} color="gray">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const Primary = Template.bind({});

Primary.args = {};
