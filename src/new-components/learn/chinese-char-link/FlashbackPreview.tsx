import { IconDefinition, faCube, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Paper, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import { When } from 'react-if'

export function FlashbackPreview({
  charChinese,
  keyword,
  pinyin,
  primitiveMeaning,
}: {
  charChinese: string
  keyword?: string
  pinyin?: string
  primitiveMeaning?: string
}) {
  return (
    <Wrapper>
      <IconColumn>
        <When condition={keyword}>
          <IconNub backgroundColor='#FAEFDA' gridArea='key' icon={faKey} iconColor='#F6AE2D' />
        </When>
        <When condition={primitiveMeaning}>
          <IconNub backgroundColor='#DDE8FF' gridArea='cube' icon={faCube} iconColor='#3366CC' />
        </When>
      </IconColumn>

      <PaperColumn>
        <When condition={pinyin}>
          <Box typography='presentation.pinyin' gridArea='pinyin'>
            {pinyin}
          </Box>
        </When>

        <Box typography='chineseNormal' fontSize='200%' gridArea='char' marginBottom={1}>
          {charChinese}
        </Box>

        <When condition={keyword}>
          <Box fontWeight='bold' gridArea='keyword' marginBottom={0.5}>
            {keyword}
          </Box>
        </When>

        <When condition={primitiveMeaning}>
          <Box fontStyle='italic' gridArea='primitive' marginBottom={0.5}>
            {primitiveMeaning}
          </Box>
        </When>
      </PaperColumn>
    </Wrapper>
  )
}

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      alignItems='center'
      display='grid'
      gridTemplateAreas={`"icons paper" "icons paper" "icons paper" "icons paper"`}
      marginRight={3}
      textAlign='center'
      sx={{ pointerEvents: 'auto' }}
    >
      {children}
    </Box>
  )
}

function IconColumn({ children }: { children: ReactNode }) {
  return (
    <Box display='grid' gridArea='icons' gridTemplateAreas={`"." "."" key" "cube"`} gridTemplateRows='subgrid' paddingY={1}>
      {children}
    </Box>
  )
}

function PaperColumn({ children }: { children: ReactNode }) {
  const { constants } = useTheme()
  return (
    <Paper
      sx={{
        alignItems: 'center',
        display: 'grid',
        borderRadius: 4,
        boxShadow: constants.boxShadow,
        gridArea: 'paper',
        gridTemplateAreas: `"pinyin" "char" "keyword" "primitive"`,
        gridTemplateRows: 'subgrid',
        minWidth: '100px',
        p: 1,
      }}
    >
      {children}
    </Paper>
  )
}

function IconNub({
  backgroundColor,
  icon,
  iconColor,
  gridArea,
}: {
  backgroundColor: string
  icon: IconDefinition
  iconColor: string
  gridArea: string
}) {
  return (
    <Box
      borderRadius={({ spacing }) => `${spacing(1)} 0 0 ${spacing(1)}`}
      component='span'
      marginBottom={0.5}
      paddingX={0.5}
      sx={{ backgroundColor }}
      {...{ gridArea }}
    >
      <FontAwesomeIcon color={iconColor} size='xs' {...{ icon }} />
    </Box>
  )
}
