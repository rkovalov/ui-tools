declare module 'react-country-flag' {
  import * as React from 'react';
  export interface ReactCountryFlagProps {
    countryCode: string;
    className?: string;
    svg?: boolean;
    style?: React.CSSProperties;
  }
  export default class ReactCountryFlag extends React.Component<ReactCountryFlagProps> {}
}
