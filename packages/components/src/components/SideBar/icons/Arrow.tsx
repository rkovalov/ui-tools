import cx from 'classnames';

interface Props {
  color?: string;
  className?: string;
}

const Arrow: React.FunctionComponent<Props> = ({ color, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="10"
      viewBox="0 0 11 10"
      className={cx(className)}
      style={{ pointerEvents: 'none' }}
    >
      <g id="double_chevron_down" transform="translate(0 10) rotate(-90)">
        <g id="Group_3498" data-name="Group 3498" transform="translate(0 0)">
          <path
            id="Path_4462"
            data-name="Path 4462"
            // eslint-disable-next-line max-len
            d="M4.29,5.29a1.014,1.014,0,0,1,1.42,0l4,4a1,1,0,0,1-1.42,1.42L5,7.41l-3.29,3.3A1,1,0,0,1,0,10a1,1,0,0,1,.29-.71ZM9,6a1,1,0,0,1-.71-.29L5,2.41,1.71,5.71A1,1,0,0,1,0,5a1,1,0,0,1,.29-.71l4-4a1.014,1.014,0,0,1,1.42,0l4,4A1,1,0,0,1,9,6Z"
            fill={color ?? '#e1e4ec'}
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  );
};
export default Arrow;
