import { Fragment } from 'react'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import { ConstituentList } from './ConstituentList'
import { useSmallScreen } from '../shared/utility-functions'

const MOCK_PHRASES = [
  { phraseChinese: '正好', phraseHungarian: 'épp jó' },
  { phraseChinese: '真正', phraseHungarian: 'valódi' },
]

export function Phrases({
  startFlashback,
}: {
  startFlashback: (constituent: string) => void
}) {
  const isSmallScreen = useSmallScreen()

  return (
    <Box
      display='grid'
      gridTemplateColumns={
        isSmallScreen
          ? '1fr'
          : 'minmax(max-content, 1fr) minmax(min-content, 1fr)'
      }
    >
      {MOCK_PHRASES.map(({ phraseChinese, phraseHungarian }, index) => (
        <Fragment key={index}>
          <ConstituentList
            phrases
            constituents={phraseChinese.split('')}
            emphasize='keyword'
            {...{ startFlashback }}
          />

          <Typography
            variant='h6'
            textAlign={isSmallScreen ? 'center' : 'initial'}
            marginBottom={isSmallScreen ? 3 : 0}
            marginLeft={isSmallScreen ? 0 : 3}
            alignSelf='center'
          >
            {phraseHungarian}
          </Typography>
        </Fragment>
      ))}
    </Box>
  )
}
