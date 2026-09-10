import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { Component } from 'react';

export function Button({
  children,
  className = '',
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button className={`button ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <article className={`card ${className}`}>{children}</article>;
}

export function Loader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="loader" role="status">
      <span aria-hidden="true" />
      {label}
    </div>
  );
}

export function InlineError({
  title = 'Something went wrong',
  message,
  retry,
}: {
  title?: string;
  message: string;
  retry?: () => void;
}) {
  return (
    <section className="inline-error" role="alert">
      <strong>{title}</strong>
      <p>{message}</p>
      {retry && <Button onClick={retry}>Try again</Button>}
    </section>
  );
}

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: (error: Error, reset: () => void) => ReactNode;
}
interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }
  reset = () => this.setState({ error: null });
  render() {
    if (this.state.error)
      return (
        this.props.fallback?.(this.state.error, this.reset) ?? (
          <InlineError message={this.state.error.message} retry={this.reset} />
        )
      );
    return this.props.children;
  }
}
