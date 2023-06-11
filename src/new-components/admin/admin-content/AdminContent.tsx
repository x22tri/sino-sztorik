import { Button, Stack, useTheme } from '@mui/material'

export default function AdminContent({ toolbarHeight }: { toolbarHeight: number }) {
  const { constants } = useTheme()

  return (
    <Stack
      boxSizing='border-box'
      bgcolor='background.paper'
      component='main'
      columnGap={6}
      display='grid'
      marginTop={`${toolbarHeight}px`}
      marginBottom={constants.bottomToolbarHeight}
      minHeight={`calc(100vh - ${toolbarHeight}px - ${constants.bottomToolbarHeight})`}
      padding={2}
    >
      aa
    </Stack>
  )
}
