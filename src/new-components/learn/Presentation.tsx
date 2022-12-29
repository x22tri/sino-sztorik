import { ReactNode, FC, ElementType } from 'react'
import Box, { BoxProps } from '@mui/material/Box'
import { Display } from '../shared/utility-components'

export function Presentation({
  charChinese,
  explanation,
  keyword,
  pinyin,
  primitiveMeaning,
}: {
  charChinese: string
  explanation?: string
  keyword?: string
  pinyin?: string
  primitiveMeaning?: string
}) {
  return (
    <Box
      display='grid'
      gridTemplateColumns='minmax(0, 1fr) repeat(1, auto) 1fr'
      justifyItems='center'
      alignItems='center'
    >
      <PresentationRow
        for={pinyin}
        styling={{ fontStyle: 'italic', fontSize: '90%' }}
      />

      <PresentationRow
        for={charChinese}
        styling={{ typography: 'chineseHeading', mb: 1 }}
      />

      <PresentationRow
        for={keyword}
        styling={{ typography: 'h4', color: 'primary.main' }}
      />

      <PresentationRow
        for={primitiveMeaning}
        styling={{ typography: 'primitiveMeaning' }}
      />
    </Box>
  )
}

function PresentationBox<B extends ElementType>(
  props: BoxProps<B, { component?: B }>
) {
  return <Box {...props}>{props.children}</Box>
}

interface PresentationRowProps {
  for?: string
  styling?: BoxProps
}

const PresentationRow: FC<PresentationRowProps> = ({
  for: element,
  styling,
}) => {
  return (
    <Display if={element}>
      <>
        <span></span>

        <PresentationBox sx={styling}>{element}</PresentationBox>

        <Box display='flex' justifySelf='flex-end' gap={1}>
          aa
        </Box>
      </>
    </Display>
  )
}
