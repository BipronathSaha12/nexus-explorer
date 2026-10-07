import { useRef, useEffect } from 'react';
export function useRenderCount() {
  const count = useRef(1);
  useEffect(() => {
    count.current += 1;
  });
  return count.current;
}
