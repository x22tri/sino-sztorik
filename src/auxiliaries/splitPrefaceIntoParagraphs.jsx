import Box from '@mui/material/Box'

const splitPrefaceIntoParagraphs = preface =>
  !preface
    ? null
    : preface.split('\n\n').map((stringLine, index) => (
        <Box
          component='p'
          textAlign='justify'
          marginTop='0'
          lineHeight='200%'
          key={index}
        >
          {stringLine}
        </Box>
      ))

export default splitPrefaceIntoParagraphs
