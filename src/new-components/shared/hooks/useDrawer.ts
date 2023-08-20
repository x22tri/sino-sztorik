import { useState, useCallback, useMemo } from 'react'

export const useDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = useCallback(() => setIsDrawerOpen(prev => !prev), [])

  const values = useMemo(() => ({ isDrawerOpen, toggleDrawer }), [isDrawerOpen, toggleDrawer])

  return values
}
