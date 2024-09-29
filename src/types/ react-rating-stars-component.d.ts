declare module 'react-rating-stars-component' {
  import { Component, CSSProperties } from 'react';

  export interface ReactStarsProps {
    count?: number;
    onChange?: (newRating: number) => void;
    size?: number;
    value?: number;
    isHalf?: boolean;
    emptyIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
    edit?: boolean;
    activeColor?: string;
    color?: string;
    char?: string;
    classNames?: string;
  }

  export default class ReactStars extends Component<ReactStarsProps> {}
}
