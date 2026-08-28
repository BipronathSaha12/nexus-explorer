import React from 'react';
import { logError } from '../../utils/logger';

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
      return (
        <div style={{ padding: '20px', backgroundColor: 'var(--surface)', color: 'var(--danger)', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={this.resetBoundary} style={{ marginTop: '10px', padding: '8px 16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
