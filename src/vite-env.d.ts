/// <reference types="vite/client" />

// Extend React to allow Webflow-specific attributes
declare namespace React {
  interface HTMLAttributes<T> {
    gradient?: number;
    cl?: string;
    loading?: string;
  }
  
  interface ImgHTMLAttributes<T> {
    fetchpriority?: string;
  }
}

// Custom elements
declare namespace JSX {
  interface IntrinsicElements {
    'cal-inline': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      style?: React.CSSProperties;
      'data-cal-namespace'?: string;
      'data-cal-link'?: string;
      'data-cal-config'?: string;
      'data-theme'?: string;
      'data-layout'?: string;
      loading?: string;
    }, HTMLElement>;
  }
}
