import React from 'react';
import { logError } from '../../utils/logger';
import FallbackUI from './FallbackUI';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    logError(this.props.context || 'ErrorBoundary', error, errorInfo);
  }

  resetBoundary = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return React.cloneElement(this.props.fallback, { 
          error: this.state.error, 
          resetBoundary: this.resetBoundary 
        });
      }
      // Default fallback if none provided
      return <FallbackUI error={this.state.error} resetBoundary={this.resetBoundary} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
