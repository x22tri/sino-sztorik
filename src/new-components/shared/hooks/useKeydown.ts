import { useEffect } from 'react'
import { UseKeydownAction } from '../interfaces'

export function useKeydown(actionArray: UseKeydownAction[]) {
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
