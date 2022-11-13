import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import { darken } from '@material-ui/core/styles'

const LESSON_LOCKED = 'Még nincs feloldva'
const LESSON_UPCOMING = 'Soron következő lecke'
const LESSON_COMPLETED = 'Már megtanult lecke'
const LESSON_NOT_IN_TIER = 'Ebben a körben nincs ilyen lecke'

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
    title: 'Kezdjünk kombinálgatni!',
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

const colorDictionary = {
  [LessonStatuses.NOT_IN_TIER]: '#ffffff', // Same as the page background color
  [LessonStatuses.LOCKED]: '#bababa',
  [LessonStatuses.UPCOMING]: '#ffcc00',
  [LessonStatuses.COMPLETED]: '#59BCF1',
}

function TierStatusBlips({ tierStatuses }: { tierStatuses: TierStatuses }) {
  return (
    <Box display='flex' flexDirection='row' gap='4px'>
      {tierStatuses.map((tier, index) => (
        <Box
          key={index}
          component='span'
          sx={{
            borderRadius: '50%',
            border: `2px solid ${darken(colorDictionary[tier], 0.1)}`,
            width: '16px',
            height: '16px',
            backgroundColor: colorDictionary[tier],
          }}
        />
      ))}
    </Box>
  )
}

function LessonCard({
  id,
  title,
  tierStatuses,
}: {
  id: number
  title: string
  tierStatuses: TierStatuses
}) {
  return (
    <Grid
      item
      display='flex'
      flexDirection='column'
      alignItems='center'
      xs={4}
      sm={12 / 5}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          py: 2,
        }}
      >
        <TierStatusBlips {...{ tierStatuses }} />
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          sx={{
            borderRadius: '50%',
            border: '4px double lightgrey',
            width: '64px',
            height: '64px',
            mt: 1,
          }}
        >
          {id}
        </Box>
        <Box textAlign='center' sx={{ mt: 1, fontSize: '90%' }}>
          {title}
        </Box>
      </Box>
    </Grid>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Box
      textAlign='center'
      mb={2}
      width='100%'
      fontSize='90%'
      fontWeight='bold'
      color='#999999'
    >
      {title}
    </Box>
  )
}

function LessonSelect() {
  const selectedLessonId = 1

  const selectedLesson = LESSONS.find(lesson => lesson.id === selectedLessonId)

  return (
    <Box
      display='flex'
      justifyContent='center'
      sx={{ mt: 3, backgroundColor: '#EBF8FF' }}
    >
      <Grid
        container
        maxWidth='1200px'
        mx={2}
        spacing={3}
        justifyContent='center'
      >
        <Grid item xs={12} md={7}>
          <SectionTitle title={'LECKEVÁLASZTÓ'} />
          <Grid container rowSpacing={2} columnSpacing={1}>
            {LESSONS.map(({ id, title, tierStatuses }) => (
              <LessonCard key={id} {...{ id, title, tierStatuses }} />
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
          <SectionTitle title={'BETEKINTŐ ABLAK'} />
          {selectedLesson && (
            <Box
              sx={{ backgroundColor: '#ffffff', borderRadius: '16px', p: 2 }}
            >
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
                <Button variant='contained'>Tanulás</Button>
                <Button variant='outlined'>Ismétlés</Button>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box>{selectedLesson.characters.length} karakter</Box>
              <Box display='flex' gap='4px' justifyContent='center'>
                {selectedLesson.characters.map(char => (
                  <Box component='span'>{char}</Box>
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
