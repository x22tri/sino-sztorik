import { MouseEvent } from 'react'
import Typography from '@mui/material/Typography'
import WestIcon from '@mui/icons-material/West'
import { LightenOnHoverButton } from './LightenOnHoverButton'

export function BackButton({ onClick, text }: { onClick: (event: MouseEvent<HTMLElement>) => void; text: string }) {
  return (
    <LightenOnHoverButton {...{ onClick }} startIcon={<WestIcon fontSize='small' />}>
      <Typography component='span' textTransform='none'>
        {text}
      </Typography>
    </LightenOnHoverButton>
  )
}
