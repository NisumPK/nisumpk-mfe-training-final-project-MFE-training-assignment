import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { Component } from 'react';
export declare function Button({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>): import('react').JSX.Element;
export declare function Card({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>): import('react').JSX.Element;
export declare function Loader({ label }: { label?: string }): import('react').JSX.Element;
export declare function InlineError({
  title,
  message,
  retry,
}: {
  title?: string;
  message: string;
  retry?: () => void;
}): import('react').JSX.Element;
interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: (error: Error, reset: () => void) => ReactNode;
}
interface ErrorBoundaryState {
  error: Error | null;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState;
  static getDerivedStateFromError(error: Error): ErrorBoundaryState;
  reset: () => void;
  render():
    | string
    | number
    | bigint
    | boolean
    | Iterable<ReactNode>
    | Promise<
        | string
        | number
        | bigint
        | boolean
        | import('react').ReactPortal
        | import('react').ReactElement<unknown, string | import('react').JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | null
        | undefined
      >
    | import('react').JSX.Element
    | null
    | undefined;
}
export {};
