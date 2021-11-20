import { render } from '@testing-library/react';
import Button from './Button';

it('renders a message', () => {
  const { getByText } = render(<Button>Test Button</Button>);
  expect(getByText('Test Button')).toBeInTheDocument();
});
