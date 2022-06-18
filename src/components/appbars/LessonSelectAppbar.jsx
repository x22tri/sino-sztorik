import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

// import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faTools,
  faCog,
  faSignOutAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

import AuthContext from '../../context/AuthContext'
import {
  AppbarWrapper,
  TopbarButton,
  ThemeChangeButton,
  Logo,
} from './AppbarWrapper'

const SearchField = ({ setSearchedChar, setLastSearch }) => {
  const auth = useContext(AuthContext)
  const theme = useTheme()

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = async event => {
    event.nativeEvent.stopImmediatePropagation()
    if (event.key === 'Enter') {
      setLastSearch(searchTerm)
      setSearchTerm('')
      try {
        document.title = `Keresés (${searchTerm}) - Sino-sztorik`
        const searchedCharInfo = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        )
        const searchedCharInfoJson = await searchedCharInfo.json()
        searchedCharInfoJson.status = searchedCharInfo.status // Adding the status to the returned object.

        if (
          Array.isArray(searchedCharInfoJson) &&
          searchedCharInfoJson.length === 1
        )
          setSearchedChar(searchedCharInfoJson[0])
        else setSearchedChar(searchedCharInfoJson)
      } catch (err) {
        console.log(err)
        setSearchedChar(err)
      }
    }
  }

  return (
    <Box display='flex' flex={2}>
      <TextField
        label='Keress karakterre, kulcsszóra vagy alapelemre...'
        variant='filled'
        size='small'
        fullWidth
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
        onKeyDown={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <FontAwesomeIcon icon={faSearch} />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputLabel-root': {
            color: theme.palette.primary.topbarButton,
            top: '-3px',
            fontSize: 14,
            fontWeight: 'bold',
          },
          '&:hover .MuiInputLabel-root': {
            color: theme.palette.secondary.main,
          },
          '& label.Mui-focused': { color: theme.palette.secondary.main },
          // '&:before .MuiFilledInput-underline': {borderBottom: `1px solid ${theme.palette.secondary.main}`},
          // '&:after .MuiFilledInput-underline': {borderBottom: `1px solid ${theme.palette.secondary.main}`},
          '& .MuiFilledInput-underline': { borderBottom: 0 },
          '& .MuiFilledInput-input': { height: '14px' },
          '& .MuiFilledInput-root': {
            backgroundColor:
              theme.palette.type === 'dark' && theme.palette.grey[900],
          },
        }}
      />
    </Box>
  )
}

const LessonSelectAppbar = ({
  themeToggle,
  searchedChar,
  setSearchedChar,
  setLastSearch,
}) => {
  const auth = useContext(AuthContext)

  const ProfileButton = () => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = !!anchorEl
    const handleClick = event => {
      setAnchorEl(event.currentTarget)
    }
    // To-Do: Add profile settings
    const handleClose = () => {
      setAnchorEl(null)
    }
    const handleLogout = () => {
      auth.logout()
      setAnchorEl(null)
    }

    return (
      <>
        <TopbarButton
          onClick={handleClick}
          iconContent={<FontAwesomeIcon icon={faUser} />}
        />

        <Menu anchorEl={anchorEl} onClose={handleClose} {...{ open }}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon style={{ minWidth: '24px' }}>
              <FontAwesomeIcon icon={faCog} />
            </ListItemIcon>
            <ListItemText>Fiókbeállítások</ListItemText>
          </MenuItem>

          {auth.loggedInUser === 8 && (
            <Link
              to='/admin'
              style={{
                textDecoration: 'none',
                color: theme.palette.text.primary,
              }}
            >
              <MenuItem>
                <ListItemIcon style={{ minWidth: '24px' }}>
                  <FontAwesomeIcon icon={faTools} />
                </ListItemIcon>
                <ListItemText>Kezelőpult</ListItemText>
              </MenuItem>
            </Link>
          )}

          <MenuItem onClick={handleLogout}>
            <ListItemIcon style={{ minWidth: '24px' }}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </ListItemIcon>
            <ListItemText>Kijelentkezés</ListItemText>
          </MenuItem>
        </Menu>
      </>
    )
  }

  const BackToLessonSelectButton = () => (
    <TopbarButton
      onClick={() => {
        setSearchedChar(null)
        document.title = 'Sino-sztorik'
      }}
      textContent='Vissza a leckeválasztóba'
      startIcon={
        <ArrowRightAltIcon sx={{ transform: 'scaleX(-1.3) scaleY(1.3)' }} />
      }
    />
  )

  return (
    <AppbarWrapper>
      <Box flex={1} flexWrap='nowrap'>
        {searchedChar ? <BackToLessonSelectButton /> : <Logo />}
      </Box>
      <SearchField {...{ setSearchedChar, setLastSearch }} />
      <Box display='flex' flex={1} justifyContent='end'>
        <ThemeChangeButton {...{ themeToggle }} />
        <ProfileButton />
      </Box>
    </AppbarWrapper>
  )
}

export default LessonSelectAppbar
