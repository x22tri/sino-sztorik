import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { deepOrange, blue, grey } from '@mui/material/colors'
import { useState } from 'react'

const LESSON_LOCKED = 'Még nincs feloldva'
const LESSON_UPCOMING = 'Soron következő lecke'
const LESSON_COMPLETED = 'Már megtanult lecke'
const LESSON_NOT_IN_TIER = 'Ebben a körben nincs ilyen lecke'

const LEARN_BUTTON = 'Tanulás'
const REVIEW_BUTTON = 'Ismétlés'
const LESSON_SELECT_TITLE = 'Leckeválasztó'
const LESSON_DETAILS_TITLE = 'A lecke részletei'
const UPCOMING_LESSON_LABEL = 'KÖVETKEZŐ'
const CHARACTER_AMOUNT_LABEL = 'karakter'

const LessonStatuses = {
  NOT_IN_TIER: LESSON_NOT_IN_TIER,
  LOCKED: LESSON_LOCKED,
  UPCOMING: LESSON_UPCOMING,
  COMPLETED: LESSON_COMPLETED,
} as const

type LessonStatus = typeof LessonStatuses[keyof typeof LessonStatuses]

type TierStatuses = [LessonStatus, LessonStatus, LessonStatus, LessonStatus]

const LESSONS: {
  id: number
  title: string
  preface: string
  tierStatuses: TierStatuses
  characters: string[]
}[] = [
  {
    id: 1,
    title: 'Első lépések',
    preface: 'teszt',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.UPCOMING,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: ['x', 'y'],
  },
  {
    id: 2,
    title: 'Több, mint a részek összege',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
  {
    id: 3,
    title: 'lesson3',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
  {
    id: 4,
    title: 'lesson4',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
  {
    id: 5,
    title: 'lesson5',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
  {
    id: 6,
    title: 'lesson6',
    preface: 'teszt2',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
    characters: [],
  },
]

const TEMP_PALETTE = {
  WHITE: '#ffffff',
  PASTELBLUE: '#EBF8FF',
  VERY_LOW_OPACITY_BLACK: '#00000011',
  LOW_OPACITY_BLACK: '#00000044',
}

const { WHITE, PASTELBLUE, VERY_LOW_OPACITY_BLACK, LOW_OPACITY_BLACK } =
  TEMP_PALETTE

function TierStatusBlips({ tierStatuses }: { tierStatuses: TierStatuses }) {
  const colorDictionary = {
    [LessonStatuses.NOT_IN_TIER]: 'transparent', // Same as the page background color
    [LessonStatuses.LOCKED]: grey[400],
    [LessonStatuses.UPCOMING]: deepOrange[500],
    [LessonStatuses.COMPLETED]: blue[800],
  }

  return (
    <Box display='flex' flexDirection='row' gap='4px' alignItems='center'>
      {tierStatuses.map((tier, index) => {
        const tierStatusColor = colorDictionary[tier]

        const border =
          tier === LessonStatuses.NOT_IN_TIER
            ? `2px solid ${VERY_LOW_OPACITY_BLACK}`
            : `none`

        return (
          <Box
            key={index}
            component='span'
            sx={{
              width: '12px',
              height: '12px',
              backgroundColor: tierStatusColor,
              borderRadius: '50%',
              border,
            }}
          />
        )
      })}
    </Box>
  )
}

function LessonCard({
  id,
  title,
  tierStatuses,
  selectedLessonId,
  setSelectedLessonId,
  currentLessonId,
}: {
  id: number
  title: string
  tierStatuses: TierStatuses
  selectedLessonId: number
  setSelectedLessonId: React.Dispatch<React.SetStateAction<number>>
  currentLessonId: number
}) {
  const selected = id === selectedLessonId
  const isCurrentLesson = id === currentLessonId
  const borderColor = isCurrentLesson
    ? deepOrange[500]
    : selected
    ? blue[800]
    : 'transparent'
  const borderWidth = isCurrentLesson && !selected ? '1px' : '2px'
  const upcomingLabelWeight = isCurrentLesson && selected ? 'bold' : 'normal'

  return (
    <Grid
      item
      display='flex'
      flexDirection='column'
      alignItems='center'
      xs={4}
      sm={12 / 5}
      position='relative'
      sx={{
        transition: 'transform 0.15s ease-in-out',
        '&:hover': {
          transform: 'translate(0%, -8%)',
          transition: 'transform 0.15s ease-in-out',
          cursor: 'pointer',
        },
      }}
      onClick={() => setSelectedLessonId(id)}
    >
      {isCurrentLesson && (
        <Box
          component='span'
          fontSize='70%'
          fontWeight={upcomingLabelWeight}
          color={deepOrange[500]}
          alignSelf='flex-start'
          position='absolute'
          top='1px'
          left='10px'
        >
          {UPCOMING_LESSON_LABEL}
        </Box>
      )}
      <Box
        position='relative'
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: isCurrentLesson ? '0 16px' : '16px',
          border: `${borderWidth} solid ${borderColor}`,
          py: 2,
        }}
      >
        <TierStatusBlips {...{ tierStatuses }} />
        <Box textAlign='center' sx={{ my: 1, fontSize: '90%' }}>
          {title}
        </Box>
        <Box
          position='absolute'
          bottom='2px'
          color={LOW_OPACITY_BLACK}
          fontSize='small'
        >
          {id}
        </Box>
      </Box>
    </Grid>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Box my={6} fontSize='140%' fontWeight='bold'>
      {title}
    </Box>
  )
}

function LessonSelect() {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1)
  const [currentLessonId] = useState<number>(1)

  const selectedLesson = LESSONS.find(lesson => lesson.id === selectedLessonId)

  return (
    <Box
      display='flex'
      justifyContent='center'
      sx={{ mt: 3, backgroundColor: PASTELBLUE }}
    >
      <Grid
        container
        maxWidth='1200px'
        mx={2}
        spacing={3}
        justifyContent='center'
      >
        <Grid item xs={12} md={7}>
          <SectionTitle title={LESSON_SELECT_TITLE} />
          <Grid container rowSpacing={2} columnSpacing={1}>
            {LESSONS.map(({ id, title, tierStatuses }) => (
              <LessonCard
                key={id}
                {...{
                  id,
                  title,
                  tierStatuses,
                  selectedLessonId,
                  setSelectedLessonId,
                  currentLessonId,
                }}
              />
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={0}
          md={5}
          flexDirection='column'
          sx={{ display: { xs: 'none', md: 'flex' } }} // On xs and sm, appears on click
        >
          <SectionTitle title={LESSON_DETAILS_TITLE} />
          {selectedLesson && (
            <Box sx={{ backgroundColor: WHITE, borderRadius: '16px', p: 2 }}>
              <Box textAlign='center' fontSize='large' fontWeight='bold'>
                {selectedLesson.title}
              </Box>
              <Box sx={{ my: 3 }}>{selectedLesson.preface}</Box>
              <Box
                display='flex'
                width='100%'
                gap='20px'
                justifyContent='center'
                sx={{
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                {selectedLesson.id === currentLessonId && (
                  <Button
                    variant='contained'
                    sx={{ backgroundColor: '#FF4920' }}
                  >
                    {LEARN_BUTTON}
                  </Button>
                )}
                <Button variant='outlined'>{REVIEW_BUTTON}</Button>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box>
                {selectedLesson.characters.length} {CHARACTER_AMOUNT_LABEL}
              </Box>
              <Box display='flex' gap='4px' justifyContent='center'>
                {selectedLesson.characters.map(char => (
                  <Box component='span' key={char}>
                    {char}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default LessonSelect
