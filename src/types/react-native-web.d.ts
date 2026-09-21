// react-native-web supports `className` at runtime; the bundled RN types do not.
// This augmentation lets web-only style hooks typecheck without `as any` noise.
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
}

export {};
