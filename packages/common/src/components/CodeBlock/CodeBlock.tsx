import { memo } from 'react';
import cx from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import styles from './CodeBlock.module.scss';

export interface Props {
  title?: string;
  className?: string;
  children: string;
  // https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/HEAD/AVAILABLE_LANGUAGES_PRISM.MD
  language?: string;
}

const CodeBlock: React.FunctionComponent<Props> = ({ title, children, language, className }) => {
  return (
    <div className={cx(styles.codeBlock, className)}>
      {title && <h3>{title}</h3>}
      <SyntaxHighlighter wrapLines language={language ?? 'js'} style={atomDark} showLineNumbers>
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default Object.assign(memo(CodeBlock), { displayName: 'CodeBlock' });
