import { styled } from '@mui/material/styles'

export const ContentWrapper = styled('div')(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.constants.boxShadow,
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: { padding: theme.spacing(4) },
}))
