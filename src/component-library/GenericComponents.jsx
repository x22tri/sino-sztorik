import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { lighten, darken } from '@material-ui/core/styles'

// const tint = (theme, color, increment = 0.2) => {
//     if (theme.palette.type === 'dark') return lighten(color, increment)
//     else return darken(color, increment)
// }

const LowEmphasisButton = ({ text, ...props }) => {
  const theme = useTheme()
  return (
    <Button
      {...props}
      variant='outlined'
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
          borderColor: theme.palette.secondary.main,
          color: theme.palette.secondary.main,
        },
      }}
    >
      {text}
    </Button>
  )
}

const LowEmphasisOnColoredBGButton = ({ text, ...props }) => {
  const theme = useTheme()
  return (
    <Button
      {...props}
      variant='outlined'
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        borderColor: theme.palette.grey[200],
        color: theme.palette.grey[200],
        '&:hover': {
          borderColor: theme.palette.secondary.main,
          color: theme.palette.secondary.main,
        },
      }}
    >
      {text}
    </Button>
  )
}

const PrimaryColorButton = ({ text, ...props }) => {
  const theme = useTheme()
  return (
    <Button
      {...props}
      variant='contained'
      color='primary'
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: lighten(theme.palette.secondary.main, 0.1),
        },
      }}
    >
      {text}
    </Button>
  )
}

const SecondaryColorButton = ({ text, ...props }) => {
  const theme = useTheme()
  return (
    <Button
      {...props}
      variant='contained'
      color='secondary'
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: darken(theme.palette.secondary.main, 0.4),
        },
      }}
    >
      {text}
    </Button>
  )
}

const WhiteButton = ({ text, ...props }) => {
  const theme = useTheme()
  return (
    <Button
      {...props}
      variant='contained'
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        '&:hover': {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.secondary.main,
        },
      }}
    >
      {text}
    </Button>
  )
}

const LessonContentCharacter = ({
  backgroundColor = undefined,
  char,
  fontSize = undefined,
  ...props
}) => {
  const theme = useTheme()
  // The default background color presupposes that the "normal" BG of the page is the color inside the "darken" brackets.
  const defaultBackgroundColor =
    theme.palette.type === 'dark'
      ? darken(theme.palette.grey[900], 0.2)
      : darken(theme.palette.primary.dark, 0.2)

  return (
    <Paper
      {...props}
      component='span'
      elevation={3}
      sx={{
        margin: '0 5px',
        padding: '12px 7px 7px',
        backgroundColor: backgroundColor || defaultBackgroundColor,
      }}
    >
      <Typography
        variant='lessonStartPaperItemChinese'
        fontSize={fontSize || 24}
        lineHeight='220%'
        sx={{ color: theme.palette.primary.contrastText }}
      >
        {char}
      </Typography>
    </Paper>
  )
}

const ErrorField = ({ children, ...props }) => {
  const theme = useTheme()
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='80vh'
      sx={{ color: theme.palette.primary.detailsElementText }}
      gap='10px'
      {...props}
    >
      {children}
    </Box>
  )
}

export {
  LessonContentCharacter,
  LowEmphasisButton,
  LowEmphasisOnColoredBGButton,
  PrimaryColorButton,
  SecondaryColorButton,
  WhiteButton,
  ErrorField,
}
