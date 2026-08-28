import { useState, useEffect, useRef } from 'react';

// This fulfills part of the debounce requirement, though the assignment specifically 
// asked to use a useRef for the debounce timer inside a component or hook.
export const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // [REQ-2] useRef as a persisted mutable value: debounce timer
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
