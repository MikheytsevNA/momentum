import { useState, useEffect, useRef } from "react";

export function useThrottle<T>(func: T, delay: number): T {
  const [throttled, setThrottled] = useState(func);
  const busy = useRef(false); // true is we have task in hands to do, false otherwise
  useEffect(() => {
    if (busy.current === false) {
      // Start func if we are not busy - change state to busy
      busy.current = true;
      setThrottled(func);
      setTimeout(() => {
        // Once we are past delay - change state to not busy
        busy.current = false;
      }, delay);
    }
  }, [func, delay]);
  return throttled;
}
