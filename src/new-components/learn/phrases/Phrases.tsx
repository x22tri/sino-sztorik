import { Fragment } from 'react'
import { Box, Theme, useMediaQuery } from '@mui/material'
import { ChineseCharLink } from '../chinese-char-link/ChineseCharLink'
import { OtherUse, Phrase } from '../../shared/interfaces'
import { When } from 'react-if'
import { LEARN_SUBHEADING_OTHER_USES, LEARN_SUBHEADING_PHRASES } from '../../shared/strings'
import { Subheading } from '../subheading/Subheading'

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
        <Subheading title={LEARN_SUBHEADING_PHRASES} styles={{ gridColumn: '1 / -1', mx: -2, my: 2 }} />
        <Phrases phrases={phrases!} {...{ currentChar }} />
      </When>

      <When condition={otherUses?.length}>
        <Subheading title={LEARN_SUBHEADING_OTHER_USES} styles={{ gridColumn: '1 / -1', mx: -2, my: 2 }} />
        <OtherUses otherUses={otherUses!} />
      </When>
    </Box>
  )
}

function Phrases({ currentChar, phrases }: { currentChar: string; phrases: Phrase[] }) {
  return (
    <>
      {phrases.map(({ characters, phraseHungarian }, index) => (
        <Fragment key={index}>
          <Box display='flex'>
            {characters.map(({ charChinese, keyword, pinyin, primitiveMeaning }, charIndex) => (
              <ChineseCharLink key={charIndex} {...{ charChinese, currentChar, keyword, pinyin, primitiveMeaning }} />
            ))}
          </Box>
          {phraseHungarian}
        </Fragment>
      ))}
    </>
  )
}

function OtherUses({ otherUses }: { otherUses: OtherUse[] }) {
  return (
    <>
      {otherUses.map(({ pinyin, meanings }) => (
        <Fragment key={pinyin}>
          <Box component='span' fontWeight={500} gridColumn='1 / 2' typography='presentation.pinyin'>
            {pinyin}
          </Box>

          {meanings.map(meaning => (
            <Box component='span' key={meaning} gridColumn='2 / 3' marginTop={-0.5}>
              {meaning}
            </Box>
          ))}
        </Fragment>
      ))}
    </>
  )
}
