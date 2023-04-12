import { ElementType } from 'react'
import { useTheme } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { If, Then, Else } from 'react-if'

export function MajorActionButton<B extends ElementType>({
  text,
  secondaryText,
  ...restProps
}: ButtonProps<B, { text: string; secondaryText?: string }>) {
  const { palette } = useTheme()

  return (
    <Button
      {...restProps}
      variant='contained'
      color='secondary'
      sx={{
        border: '2px solid transparent',
        borderRadius: '0 8px',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          border: `2px solid ${palette.secondary.dark}`,
          boxShadow: 'none',
        },
        ...restProps.sx,
      }}
    >
      <If condition={secondaryText}>
        <Then>
          <Typography lineHeight={1} variant='button'>
            {text}
          </Typography>
          <Typography fontSize='75%' lineHeight={1} variant='caption'>
            {secondaryText}
          </Typography>
        </Then>
        <Else>{text}</Else>
      </If>
    </Button>
  )
}
