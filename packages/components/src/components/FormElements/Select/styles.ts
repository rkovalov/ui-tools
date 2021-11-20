import type { CSSObject } from '@emotion/serialize';

export type SelectStyles = { [key: string]: CSSObject };

export const baseStyles: SelectStyles = {
  control: {
    border: 'none',
    borderLeft: 'none',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'none',
    },
    borderColor: 'none',
    backgroundColor: 'inherit',
    borderRadius: 'inherit',
    minHeight: 'inherit',
    height: 'inherit',
    color: 'inherit',
  },
  menuPortal: { zIndex: 999999 },
  menu: { margin: 0, boxShadow: '0 0 20px #2028601A', zIndex: 999999 },
  valueContainer: { paddingLeft: 15, fontSize: 'inherit', color: 'inherit' },
  option: { padding: '2px 20px', fontSize: 'inherit', color: 'inherit' },
  indicatorSeparator: { display: 'none' },
  indicatorsContainer: { height: 'inherit' },
  clearIndicator: { padding: 0, cursor: 'pointer' },
  dropdownIndicator: { padding: '0 10px 0 5px' },
  singleValue: { margin: 0, color: 'inherit' },
  multiValue: {
    height: 20,
    marginRight: 5,
    borderRadius: 6,
    backgroundColor: '#E8EEF8',
    alignItems: 'center',
    padding: '5px 7px 5px 10px',
    fontSize: 14,
    fontWeight: 500,
    color: '#6D849B',
  },
  multiValueRemove: {
    paddingRight: 0,
    '&:hover': {
      backgroundColor: 'inherit',
      color: 'inherit',
      cursor: 'pointer',
    },
  },
  multiValueLabel: {
    paddingLeft: 0,
    color: 'inherit',
  },
};

export default baseStyles;
