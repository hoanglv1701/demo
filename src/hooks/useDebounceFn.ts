import { useRef } from 'react';
import { DebounceSettings, debounce } from 'lodash';
import { useUnMount } from '@/hooks/useUnMount';

type Fn = (...args: any) => any;

export function useDebounceFn<T extends Fn>(fn: T, options?: DebounceSettings & { wait: number }) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 600;

  const debounced = useRef(
    debounce<T>(
      ((...args: any[]) => {
        return fnRef.current(...args);
      }) as T,
      wait,
      options
    )
  ).current;

  useUnMount(() => {
    debounced.cancel();
  });

  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush
  };
}
