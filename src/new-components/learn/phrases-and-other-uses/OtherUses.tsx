import { Fragment } from 'react'
import { Box } from '@mui/material'
import { OtherUse } from '../../shared/interfaces'

export function OtherUses({ otherUses }: { otherUses: OtherUse[] }) {
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
