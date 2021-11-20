import { memo } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  target?: HTMLElement;
}
const Portal: React.FunctionComponent<Props> = ({ children, target = document.body }) =>
  ReactDOM.createPortal(children, target);

export default Object.assign(memo(Portal), { displayName: 'Portal' });
