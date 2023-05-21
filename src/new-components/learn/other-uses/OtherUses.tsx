import { Box, Theme, useMediaQuery } from '@mui/material'
import { OtherUse } from '../../shared/interfaces'

export function OtherUses({ otherUses }: { otherUses: OtherUse[] }) {
  const isMediumScreen = useMediaQuery(({ breakpoints }: Theme) => breakpoints.between('sm', 'lg'))

  return (
    <Box
      columnGap={3}
      display='grid'
      paddingX={2}
      rowGap={2}
      sx={{ gridTemplateColumns: `repeat(${isMediumScreen ? 2 : 1}, 1fr)` }}
    >
      {otherUses.map(({ pinyin, meanings }) => (
        <Box display='grid' key={pinyin} sx={{ gridTemplateColumns: '1fr 1fr' }}>
          <Box component='span' fontWeight={500} gridColumn='1 / 2' typography='presentation.pinyin'>
            {pinyin}
          </Box>

          {meanings.map(meaning => (
            <Box component='span' key={meaning} gridColumn='2 / 3'>
              {meaning}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}
