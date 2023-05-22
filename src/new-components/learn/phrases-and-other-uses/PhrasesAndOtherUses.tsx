import { Box, Theme, useMediaQuery } from '@mui/material'
import { OtherUse, Phrase } from '../../shared/interfaces'
import { When } from 'react-if'
import { LEARN_SUBHEADING_OTHER_USES, LEARN_SUBHEADING_PHRASES } from '../../shared/strings'
import { Subheading } from '../headings/Subheading'
import { Phrases } from './Phrases'
import { OtherUses } from './OtherUses'

export function PhrasesAndOtherUses({
  currentChar,
  otherUses,
  phrases,
}: {
  currentChar: string
  otherUses?: OtherUse[]
  phrases?: Phrase[]
}) {
  const isMediumScreen = useMediaQuery(({ breakpoints }: Theme) => breakpoints.between('sm', 'lg'))

  return (
    <Box
      alignItems='baseline'
      display='grid'
      columnGap={3}
      paddingX={2}
      rowGap={2}
      sx={{ gridTemplateColumns: `repeat(${isMediumScreen ? 2 : 1}, max-content auto)` }}
    >
      <When condition={phrases?.length}>
        <Subheading title={LEARN_SUBHEADING_PHRASES} styles={{ gridColumn: '1 / -1', mx: -2, mt: 3, mb: 1 }} />
        <Phrases phrases={phrases!} {...{ currentChar }} />
      </When>

      <When condition={otherUses?.length}>
        <Subheading title={LEARN_SUBHEADING_OTHER_USES} styles={{ gridColumn: '1 / -1', mx: -2, mt: 3, mb: 1 }} />
        <OtherUses otherUses={otherUses!} />
      </When>
    </Box>
  )
}
