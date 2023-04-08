import { useEffect } from 'react'

export function useKeydown(actionArray: { on: string; do: () => void }[]) {
  const handler = ({ key }: KeyboardEvent) => {
    actionArray.forEach(action => {
      if (key === action.on && action.do) {
        action.do()
      }
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', handler)

    return () => {
      window.removeEventListener('keydown', handler)
    }
  })
}
