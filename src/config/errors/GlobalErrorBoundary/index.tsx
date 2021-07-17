/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */

import React, { ErrorInfo } from 'react';

export class GlobalErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to metrics
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Algo salió mal.</h1>;
    }

    return children;
  }
}
