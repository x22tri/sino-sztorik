import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import MainPageAppbar from './appbars/MainPageAppbar'
import AuthPage from './AuthPage'
import {
  LowEmphasisOnColoredBGButton,
  SecondaryColorButton,
} from '../component-library/GenericComponents'

const FAQAccordion = ({ question, answer }) => {
  const theme = useTheme()
  return (
    <Accordion
      disableGutters
      elevation={0}
      sx={{
        marginTop: '20px',
        borderRadius: '4px',
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary
        sx={{
          py: '2px',
          flexDirection: 'row-reverse',
          fontWeight: 'bold',
          backgroundColor: theme.palette.background.default,
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
          '& .MuiAccordionSummary-content': { marginLeft: '5px' },
        }}
        expandIcon={
          <ArrowForwardIosSharpIcon
            sx={{ fontSize: '0.7rem', marginTop: '1px' }}
          />
        }
      >
        {question}
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: theme.palette.background.default,
          borderTop: `1px solid ${theme.palette.divider}`,
          borderRadius: '0 0 4px 4px',
          textAlign: 'justify',
          paddingTop: '20px',
        }}
      >
        {answer}
      </AccordionDetails>
    </Accordion>
  )
}

function MainPage({ themeToggle }) {
  const theme = useTheme()

  // Setting up the authentication modal.
  const [signupOrLoginState, setSignupOrLoginState] = useState(null)
  const openAuthModal = loginOrSignup => setSignupOrLoginState(loginOrSignup)
  const closeAuthModal = () => setSignupOrLoginState(null)

  // Setting up the styled elements.
  const LoginButton = () => (
    <LowEmphasisOnColoredBGButton
      onClick={() => openAuthModal('login')}
      text='Már van fiókom'
    />
  )

  const RegisterButton = () => (
    <SecondaryColorButton
      onClick={() => openAuthModal('signup')}
      text='Új fiók'
    />
  )

  const ExplanatoryParagraph = ({ children }) => (
    <Typography variant='mainPageText' component='p' marginBottom='30px'>
      {children}
    </Typography>
  )

  const notSmallScreen = useMediaQuery('(min-width:550px)')

  return (
    <>
      <MainPageAppbar {...{ openAuthModal, themeToggle }} />
      <Box component='main'>
        <Grid
          container
          component='section'
          spacing={10}
          sx={{
            marginTop: 0,
            paddingBottom: '80px',
            backgroundColor:
              theme.palette.type === 'dark'
                ? theme.palette.grey[900]
                : theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          }}
        >
          <Grid item xs={12}>
            <Grid container direction='column' display='flex'>
              <Grid item component='header' sx={{ marginBottom: '30px' }}>
                <Box display='flex' justifyContent='center' textAlign='center'>
                  <Typography
                    fontWeight='bold'
                    fontSize={28}
                    lineHeight='1.3'
                    component='h2'
                  >
                    Tanulj úgy kínaiul, mint&nbsp;egy
                  </Typography>
                </Box>
                <Box display='flex' justifyContent='center' textAlign='center'>
                  <Typography
                    variant='mainPagePrimaryHeading'
                    color={theme.palette.secondary.main}
                    component='h1'
                  >
                    {notSmallScreen ? 'memóriabajnok' : 'memória-bajnok'}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                display='flex'
                textAlign='justify'
                justifyContent='center'
              >
                <Box flexBasis='800px' margin='0 20px'>
                  <Box>
                    <Typography variant='mainPageText' component='p'>
                      A <strong>Sino-sztorik</strong> segítségével hatékonyan
                      megtanulhatod a <strong>3000 </strong>
                      legfontosabb kínai írásjegyet, magolás helyett{' '}
                      <strong>könnyen megjegyezhető történetekkel.</strong>
                    </Typography>
                  </Box>

                  <Box
                    display='flex'
                    justifyContent='center'
                    marginTop='50px'
                    gap={3}
                  >
                    <RegisterButton />
                    <LoginButton />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          component='section'
          direction='row-reverse'
          spacing={10}
          marginTop={0}
        >
          <Grid item xs={12}>
            <Grid container direction='column' display='flex'>
              <Grid item component='header' marginBottom='30px'>
                <Box
                  display='flex'
                  justifyContent='center'
                  textAlign='center'
                  margin='0 10px'
                >
                  <Typography
                    variant='mainPageSecondaryHeading'
                    color={theme.palette.primary.main}
                    component='h2'
                  >
                    Hogyan működik?
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                display='flex'
                textAlign='justify'
                justifyContent='center'
              >
                <Box flexBasis='800px' margin='0 20px 50px'>
                  <ExplanatoryParagraph>
                    A kínai karakterek egy része <strong>képjel</strong>, tehát
                    azt ábrázolja, amit jelent. Ilyen például a 口 (kŏu), ami{' '}
                    <strong>„szájat”</strong> jelent, és úgy is néz ki, mint egy
                    tágra nyílt száj.
                  </ExplanatoryParagraph>

                  <ExplanatoryParagraph>
                    De a <strong>legtöbb karakter nem egyszerű képjel</strong>,
                    hanem képjelek és egyéb alapelemek{' '}
                    <strong>kombinációja. </strong>A 战 (zhàn) karaktert
                    nézegethetjük órákig, mégsem jövünk rá, hogy jelentése{' '}
                    <strong>„háború”</strong>.
                  </ExplanatoryParagraph>

                  <ExplanatoryParagraph>
                    Mi alkotóelemeire bontottuk a{' '}
                    <strong>
                      3000 legfontosabb egyszerűsített kínai karaktert
                    </strong>
                    , és olyan
                    <strong> sorrendbe</strong> tettük neked, hogy ne kelljen
                    olyan karaktert megtanulnod, amelynek az alkotóelemeit nem
                    ismered.
                  </ExplanatoryParagraph>

                  <ExplanatoryParagraph>
                    És hogy ne kelljen több százszor leírnod ezeket a
                    karaktereket, amíg meg nem jegyzed őket,{' '}
                    <strong>történeteket írtunk </strong> hozzájuk. Ha{' '}
                    <strong>élénken vizualizálod</strong> őket, egy életre veled
                    maradhatnak.
                  </ExplanatoryParagraph>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        component='section'
        justifyContent='center'
        sx={{
          backgroundColor:
            theme.palette.type === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[200],
          color: theme.palette.tertiary.light,
        }}
      >
        <Box component='header' margin='60px auto 30px' textAlign='center'>
          <Typography
            variant='mainPageSecondaryHeading'
            component='h2'
            margin='0 10px'
          >
            Gyakran ismételt kérdések
          </Typography>
        </Box>
        <Box display='block' width='80%' margin='auto' marginBottom='60px'>
          <FAQAccordion
            question='Pontosan mi a Sino-sztorik?'
            answer='A Sino-sztorik gyakorlatilag egy nyelvi kurzus, amely rendszerezetten, egyesével tanítja meg az egyszerűsített kínai írásjeleket.
                    Leckékre van osztva, mint egy tankönyv, és a korábban megismert karakterekre építve mutat be új karaktereket.
                    Minden karakterhez történetet csatol, amely a karakter alkotóelemeire épül.
                    Ha egy alkotóelem önmagában nem jelent semmit, vagy a jelentése túl elvont, a Sino-sztorik olyan jelentéssel ruházza fel, amely könnyebben elképzelhető.'
          />
          <FAQAccordion
            question='Már korábban elkezdtem kínaiul tanulni. Így is belekezdhetek a Sino-sztorikba?'
            answer='Persze! Ez a kurzus abban segít, hogy magabiztosan fel tudd ismerni, meg tudd különböztetni és le tudd írni a kínai karaktereket.
                    Kiválóan kiegészíti a hagyományos nyelvtanulási módszereket, amelyek általában épp másfajta készségekre fókuszálnak, pl. a beszédkészségre és a szövegértésre.
                    Ha viszont kifejezetten a kínai írásjeleket kezdted el tanulni egy másik módszerrel (pl. másféle történetek vagy a tényleges etimológia alapján), akkor a Sino-sztorik használata összezavarhat.
                    Ettől függetlenül ajánljuk, hogy próbáld ki.'
          />
          <FAQAccordion
            question='Szükséges valamilyen előzetes tudás a kurzus megértéséhez?'
            answer='Kínaiul semennyire nem kell tudni.
                    Az általános műveltség azonban nem árt – mind a magyar, mind a világkultúra terén. Sok esetben ugyanis sokkal frappánsabb, élénkebb történeteket kapunk, ha beleépítünk egy-egy filmes, könyves stb. utalást.
                    Természetesen amennyire lehet, egy átlagos ember műveltségéhez próbáljuk igazítani a történeteket.'
          />
          <FAQAccordion
            question='Nem tetszik az egyik történet. Nem lehetne lecserélni?'
            answer='Tudjuk, hogy nem mindenkinek tetszhet minden történet.
                    A kínai írásjelek rendszere viszont elég szövevényes, és egy apró változtatás is összekeverhetővé tehet egy történetet egy másik történettel, és így egy karaktert egy másik karakterrel.
                    A történeteket és alapelemeket próbáltuk úgy kialakítani, hogy közben a kurzus egészét is figyelembe vettük.
                    A javaslataidat azért mindenképpen szívesen fogadjuk a lenti elérhetőségeken, és elgondolkozunk a változtatáson.'
          />
          <FAQAccordion
            question='Miért nem a karakterek valódi eredetét tanítod meg?'
            answer='A kínai karakterek az idők során sok változáson mentek keresztül.
                    Vegyük az 爱 (ài) karaktert példának: eredetileg 㤅 volt, ahol a 旡 a hangjelölő elem és a 心 az értelemjelölő.
                    A Csin-dinasztiában aztán tettek alulra egy teljesen indokolatlan 夊-t, majd a 旡 elem 爫冖-vé amortizálódott, így jött létre a mai hagyományos írásjel, az 愛.
                    1956-ban aztán a Kínai Népköztársaságban egyszerűsítették ezt a karaktert is, így kapjuk meg a mai egyszerűsített írásjelet, az 爱-t.
                    Az efféle levezetések az eziránt érdeklődők és a kutatók számára hasznosak, a nyelvtanulás szempontjából viszont nem túlzottan.
                    Ezért a Sino-sztorik az egyszerűsített írásjel mai kinézetét veszi alapul, ezt bontja le és teszi emészthetővé.'
          />
          <FAQAccordion
            question='A Sino-sztorik megtanít kínaiul beszélni és fogalmazni is?'
            answer='Nem, ezt a tudást máshonnan kell megszerezned.
                    A karakterek kiejtését és néhány gyakoribb szókapcsolatot feltüntetünk, de ez a kurzus főképp kiegészítőként szolgál egy tényleges nyelvtanfolyam vagy tankönyv mellé.'
          />
          <FAQAccordion
            question='A Sino-sztorik megtanítja a hagyományos kínai írásjeleket is?'
            answer='Nem, csak az egyszerűsítetteket.'
          />
          <FAQAccordion
            question='Honnan tudod, melyik a 3000 legfontosabb karakter?'
            answer='Természetesen a karakterek gyakorisága az elsődleges szempont, de nem egyszerűen csak a 3000 leggyakoribb karakter lett beválogatva. Egyes írásjelek, bár magukban ritkák, alkotóelemként szolgálnak más, gyakoribb karakterek számára, így ezek is bekerültek.
                    És ez fordítva is igaz: bizonyos írásjelek (pl. tulajdonnevek) statisztikailag gyakoribbak, de kevésbé fontos megtanulnunk őket ahhoz, hogy elsajátítsuk a kínai nyelvet.
                    Viszont ha befejezed a kurzust, feloldásra kerül az adatbázisban szereplő összes karakter – nem csak a legfontosabbnak ítélt 3000!'
          />
        </Box>
        {/* <Box margin='auto' marginBottom='60px' textAlign='center'>
            Más kérdésed van? Írd meg az info@sinosztorik.hu-ra!
            </Box> */}
      </Box>
      <Box
        display='flex'
        component='footer'
        justifyContent='center'
        sx={{ py: '30px' }}
        backgroundColor={
          theme.palette.type === 'light' && theme.palette.grey[300]
        }
        color={
          theme.palette.type === 'light'
            ? theme.palette.grey[500]
            : theme.palette.grey[800]
        }
      >
        © 2022 Dió Dávid
      </Box>
      <AuthPage
        {...{ signupOrLoginState, setSignupOrLoginState, closeAuthModal }}
      />
    </>
  )
}

export default MainPage
