import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { logError } from './utils/logger.js';

// [REQ-22] register window.onerror and window.addEventListener("unhandledrejection", …) and route both into logError
window.onerror = (message, source, lineno, colno, error) => {
  logError('window.onerror', error || message, { source, lineno, colno });
};

window.addEventListener('unhandledrejection', (event) => {
  logError('unhandledrejection', event.reason);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
