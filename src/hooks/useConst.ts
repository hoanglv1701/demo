import { useRef } from 'react';

export function useConst<T>(value: T | (() => T)): T {
  const ref = useRef<{ value: T }>();

  if (ref.current === undefined) {
    ref.current = {
      value: typeof value === 'function' ? (value as Function)() : value
    };
  }

  return ref.current.value;
}
