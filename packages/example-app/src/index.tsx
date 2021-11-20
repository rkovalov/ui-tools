import ReactDOM from 'react-dom';
import { color, Button, Tag } from '@ui-tools/components';

import './index.scss';
import styles from './index.module.scss';

ReactDOM.render(
  <h1 className={styles.title} style={{ color: color('blue', 90) }}>
    Examples
    <Button>Nice Button</Button>
    <Tag>tag</Tag>
  </h1>,
  document.getElementById('root')
);

console.log(`-----------------------------`);
console.log(`Version: ${process.env.VERSION ?? '-'}`);
console.log(`Branch: ${process.env.BRANCH ?? '-'}`);
console.log(`CommitHash: ${process.env.COMMITHASH ?? '-'}`);
console.log(`PUBLIC_PATH: ${process.env.PUBLIC_PATH ?? '-'}`);
console.log(`-----------------------------`);
