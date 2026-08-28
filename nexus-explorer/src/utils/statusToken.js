export const getStatusToken = (status) => {
  if (!status) return 'unknown';
  const s = status.toLowerCase();
  if (s === 'alive') return 'alive';
  if (s === 'dead') return 'dead';
  return 'unknown';
};
