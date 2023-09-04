import { Box, Button, Popover, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { MouseEvent, TouchEvent, useState } from 'react'
import { When } from 'react-if'

export function CourseLocation({
  calculatedIndex,
  tier,
  lessonNumber,
  savedIndex,
}: {
  calculatedIndex: number
  tier: number
  lessonNumber: number
  savedIndex?: number
}) {
  const { constants, palette, spacing } = useTheme()
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement | null>(null)

  const discrepancyDetected = calculatedIndex !== savedIndex

  function openPopover(event: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>) {
    if (!discrepancyDetected) {
      return
    }

    setAnchorEl(event.currentTarget)
  }

  function closePopover() {
    setAnchorEl(null)
  }

  return (
    <Box alignSelf='center'>
      <Button
        component={Link}
        to={`/admin/lessons/${lessonNumber}`}
        onMouseEnter={openPopover}
        onMouseLeave={closePopover}
        variant='text'
        size='small'
        sx={{ minWidth: 0, px: 1 }}
      >
        {tier}/{lessonNumber}/{calculatedIndex}{' '}
        <When condition={discrepancyDetected}>
          <Typography
            component='span'
            color='warning.main'
            variant='button'
            sx={{ ml: 0.5, textDecoration: 'line-through 1.5px' }}
          >
            {`(${savedIndex})`}
          </Typography>
        </When>
      </Button>

      <Popover
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        disableRestoreFocus
        open={!!anchorEl}
        marginThreshold={2}
        PaperProps={{
          style: {
            backgroundColor: palette.warning.dark,
            borderRadius: spacing(2),
            boxShadow: constants.boxShadow,
            color: palette.primary.contrastText,
            padding: spacing(2),
          },
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ pointerEvents: 'none', marginTop: spacing(1) }}
        {...{ anchorEl }}
      >
        <Typography variant='body2' lineHeight={2} maxWidth='48ch'>
          {`A karakter-adatbázis szerint e karakter a ${lessonNumber}. lecke ${tier}. körének ${savedIndex}. helyén áll, de a leckeadatbázis szerint a kör ${calculatedIndex}. helyén. Mentéskor ez utóbbi adat felülírja majd az előbbit.`}
        </Typography>
      </Popover>
    </Box>
  )
}
