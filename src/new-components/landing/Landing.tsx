import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import LogoTitle from '../shared/components/LogoTitle'
import { FirstSectionText } from './section-texts/FirstSectionText'
import { ConstituentsDemo } from './constituents-demo/ConstituentsDemo'
import { SecondSectionText } from './section-texts/SecondSectionText'
import { TiersDemo } from './tiers-demo/TiersDemo'
import { ThirdSectionText } from './section-texts/ThirdSectionText'
import { SupplementsDemo } from './supplements-demo/SupplementsDemo'
import { BottomSignupCTA } from './BottomSignupCTA'
import { LandingGrid } from './LandingGrid'

export function Landing() {
  const { constants } = useTheme()

  const containerStyles = { margin: 'auto', maxWidth: constants.maxContentWidth, width: '100%' }

  return (
    <>
      <AppBar elevation={0} sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={containerStyles}>
          <LogoTitle />
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box bgcolor='primary.700' sx={{ backgroundImage: constants.synapsesBackground }}>
        <LandingGrid
          parentProps={containerStyles}
          demoContent={<ConstituentsDemo />}
          demoProps={{
            display: 'grid',
            gap: 4,
            gridTemplateRows: `4em minmax(23em, max-content) 4em`,
            marginTop: { xs: 4, md: 0 },
          }}
          textContent={<FirstSectionText />}
          textProps={{ color: 'primary.contrastText', textAlign: { xs: 'center', md: 'start' } }}
        />
      </Box>

      <Box bgcolor='background.paper'>
        <LandingGrid
          parentProps={{
            direction: { xs: 'column', md: 'row-reverse' },
            ...containerStyles,
            paddingTop: { xs: 6, md: 12 },
            paddingBottom: { xs: 6, md: 16 },
          }}
          demoContent={<TiersDemo />}
          demoProps={{ marginTop: { xs: 0, md: 8 } }}
          textContent={<SecondSectionText />}
        />
      </Box>

      <Box bgcolor='secondary.200'>
        <LandingGrid
          parentProps={{ ...containerStyles, paddingTop: { xs: 6, md: 12 }, paddingBottom: { xs: 6, md: 16 } }}
          demoContent={<SupplementsDemo />}
          demoProps={{ marginTop: { xs: 4, md: 0 } }}
          textContent={<ThirdSectionText />}
        />
      </Box>

      <Box bgcolor='background.paper'>
        <BottomSignupCTA parentProps={containerStyles} />
      </Box>
    </>
  )
}
