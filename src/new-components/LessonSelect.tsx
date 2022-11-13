import Box from '@mui/material/Box'
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
  tierStatuses: TierStatuses
}[] = [
  {
    id: 1,
    title: 'Első lépések',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.UPCOMING,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
  },
  {
    id: 2,
    title: 'Kezdjünk kombinálgatni!',
    tierStatuses: [
      LessonStatuses.COMPLETED,
      LessonStatuses.LOCKED,
      LessonStatuses.NOT_IN_TIER,
      LessonStatuses.NOT_IN_TIER,
    ],
  },
]

const colorDictionary = {
  [LessonStatuses.NOT_IN_TIER]: '#efefef',
  [LessonStatuses.LOCKED]: '#bababa',
  [LessonStatuses.UPCOMING]: '#ffcc00',
  [LessonStatuses.COMPLETED]: '#66cc66',
}

function TierStatusBlips({ tierStatuses }: { tierStatuses: TierStatuses }) {
  return (
    <Box display='flex' flexDirection='row' gap='4px'>
      {tierStatuses.map((tier, index) => (
        <Box
          key={index}
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
      xs={6}
      md={3}
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
      <Box textAlign='center' sx={{ mt: 1 }}>
        {title}
      </Box>
    </Grid>
  )
}

function LessonSelect() {
  return (
    <Grid container width='50vw'>
      {LESSONS.map(({ id, title, tierStatuses }) => (
        <LessonCard key={id} {...{ id, title, tierStatuses }} />
      ))}
    </Grid>
  )
}

export default LessonSelect
