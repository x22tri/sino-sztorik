import { useEffect, useRef } from 'react'

export function useOnChange<T>(value: T, effect: (prev: T, next: T) => void) {
  const latestValue = useRef(value)
  const callback = useRef(effect)
  callback.current = effect

  useEffect(() => {
    if (value !== latestValue.current) {
      callback.current(latestValue.current, value)
    }
  }, [value])
}
