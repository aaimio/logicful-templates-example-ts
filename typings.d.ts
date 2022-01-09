export {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'custom-element': {
        [key: string]: any;
      };
    }
  }
}
