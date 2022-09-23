import { useTheme } from '@mui/system'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import PopupTooltip from '../../../auxiliaries/PopupTooltip'
import ConditionalWrapper from '../../../auxiliaries/ConditionalWrapper'
import { keywordPrimitiveStatusFinder } from '../../../auxiliaries/keywordPrimitiveStatusFinder'
import './CharacterInfo.css'

// This const specifies the margin between the left and the right side row of the table.
const tableMargin = '15px'

// The ChineseChar is a component of CharacterInfo.
const ChineseChar = ({ char, small, unknownElement }) => {
  const theme = useTheme()

  const borderColors = {
    none: null,
    primitiveOnly: theme.palette.tertiary.main,
    keywordOnly: theme.palette.primary.dark,
    keywordAndPrimitive: `linear-gradient(to bottom, ${theme.palette.primary.dark}, 70%, ${theme.palette.tertiary.main})`,
  }

  return (
    <Box
      className={`chinese-char-wrapper-${small ? 'small' : 'big'}`}
      sx={{ background: borderColors[keywordPrimitiveStatusFinder(char)] }}
    >
      <Box
        className={`chinese-char-inner-${small ? 'small' : 'big'}`}
        backgroundColor={theme.palette.background.paper}
      >
        <Box display='table-row' marginTop='10px'>
          {/* If the character is a productive phonetic element, render an icon with a tooltip. */}
          {char?.productivePhonetic && !small && (
            <PopupTooltip
              title={
                'Gyakran az ezt a karaktert tartalmazó más karaktereket is így, vagy hasonlóan kell majd kiejteni.'
              }
            >
              <Box
                className='pinyin-productive'
                color={theme.palette.primary.lowPrioText}
              >
                <PodcastsIcon />
              </Box>
            </PopupTooltip>
          )}
          <Typography
            variant={small ? 'recapPinyin' : 'pinyin'}
            sx={{ textTransform: 'none' }}
          >
            {char?.pinyin || unknownElement.pinyin}
          </Typography>
        </Box>
        <Box display='table-row'>
          <Typography
            variant={small ? 'recapChinese' : 'h3'}
            sx={{
              lineHeight: char?.pinyin ? 0.8 : 1.2,
              paddingBottom: char?.pinyin ? '14px' : 0,
            }}
          >
            {char?.charChinese || unknownElement.charChinese}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const PrimitiveRow = ({ char, small }) => {
  const theme = useTheme()
  return (
    <Box display='table-row'>
      <Box display='table-cell' />
      <Box className='charinfo-primitive-box' sx={{ marginLeft: tableMargin }}>
        <KeyboardReturnIcon
          sx={{ fontSize: small ? 14 : 28, transform: 'scaleX(-1)' }}
        />
        <Box
          component='span'
          fontSize={small ? 12 : 20}
          paddingRight={small ? '2px' : '6px'}
        >
          <FontAwesomeIcon icon={faCube} color={theme.palette.tertiary.main} />
        </Box>
        <Box component='span'>
          <Typography
            variant={small ? 'recapPrimitive' : 'primitiveMeaning'}
            color={theme.palette.tertiary.main}
            sx={{ textTransform: 'none' }}
          >
            {char.primitiveMeaning}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const PrimitiveOnly = ({ char, small }) => {
  const theme = useTheme()
  return (
    <>
      <Box
        component='span'
        sx={{ fontSize: small ? 16 : 40, paddingRight: small ? '4px' : '10px' }}
      >
        <FontAwesomeIcon icon={faCube} color={theme.palette.tertiary.main} />
      </Box>
      {char.primitiveMeaning}
    </>
  )
}

// The exported component: the basic info about the character (everything above the Story).
const CharacterInfo = ({ char, small }) => {
  const theme = useTheme()

  const unknownElement = {
    pinyin: null,
    charChinese: <FontAwesomeIcon icon={faQuestionCircle} />,
    keyword: 'Ismeretlen',
    story: 'A történet nem elérhető.',
  }

  const keywordPrimitiveStatusDictionary = {
    none: [null, null],
    primitiveOnly: [
      <PrimitiveOnly {...{ char, small }} />,
      <Box display='table-row' height='20px' />,
      theme.palette.tertiary.main,
    ],
    keywordOnly: [
      char ? char.keyword : unknownElement.keyword,
      <Box display='table-row' height='20px' />,
    ],
    keywordAndPrimitive: [
      char ? char.keyword : unknownElement.keyword,
      <PrimitiveRow {...{ char, small }} />,
    ],
  }

  const [renderedFirstElement, renderedSecondElement, firstElementColor] =
    keywordPrimitiveStatusDictionary[keywordPrimitiveStatusFinder(char)]

  const renderExplanationCondition = !!char?.explanation && !small

  return (
    <>
      <Box display='table-row'>
        <Box display='inline-block'>
          <ChineseChar {...{ char, small, unknownElement }} />
        </Box>

        <Box
          display={small ? 'block' : 'table-cell'}
          sx={{ verticalAlign: 'bottom', paddingBottom: '4px' }}
        >
          {/* If the character has an "explanation", render the keyword with a tooltip. */}
          <ConditionalWrapper
            condition={renderExplanationCondition}
            wrapper={children => (
              <PopupTooltip title={char.explanation}>{children}</PopupTooltip>
            )}
          >
            <Typography
              component='span'
              variant={small ? 'detailsItem' : 'h1'}
              sx={{
                marginLeft: !small && tableMargin,
                textTransform: 'none',
                textDecoration:
                  renderExplanationCondition && `underline dashed 1px`,
                cursor: renderExplanationCondition && 'help',
                color: firstElementColor,
              }}
            >
              {renderedFirstElement}
            </Typography>
          </ConditionalWrapper>
        </Box>
      </Box>

      {/* Render the primitive meaning (if applicable and the character has a regular meaning as well).
        Show a spacer if there isn't a third row (unless the CharacterInfo is rendered in a Recap). */}
      {renderedSecondElement}
    </>
  )
}

export { ChineseChar, CharacterInfo }
