import { CSSProperties } from 'react';

export declare type PropsType = {
  width: number;
  height: number;
  delay: number;
  autoScale: boolean | { x: boolean; y: boolean };
  isfullScreen: boolean;
  containerStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
};
