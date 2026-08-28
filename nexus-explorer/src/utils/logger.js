export const logInfo = (context, message) => {
  console.log(`[INFO] ${new Date().toISOString()} [${context}]: ${message}`);
};

export const logWarn = (context, message) => {
  console.warn(`[WARN] ${new Date().toISOString()} [${context}]: ${message}`);
};

export const logError = (context, error, errorInfo = null) => {
  console.error(`[ERROR] ${new Date().toISOString()} [${context}]:`, error);
  if (errorInfo) {
    console.error('Error Info:', errorInfo);
  }
};
