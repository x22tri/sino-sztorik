import { DependencyList, EffectCallback, useCallback, useEffect, useRef } from 'react'
import debounce from 'lodash.debounce'

export function useDebouncedEffect(effect: EffectCallback, deps: DependencyList = [], wait = 300) {
  const cleanUp = useRef<void | (() => void)>()

  const effectRef = useRef<EffectCallback>()

  effectRef.current = useCallback(effect, deps)

  const lazyEffect = useCallback(
    debounce(
      () => {
        if (cleanUp.current instanceof Function) {
          cleanUp.current()
        }
        cleanUp.current = effectRef.current?.()
      },
      wait,
      { leading: true }
    ),
    []
  )

  useEffect(lazyEffect, deps)

  useEffect(() => {
    return () => (cleanUp.current instanceof Function ? cleanUp.current() : undefined)
  }, [])
}
