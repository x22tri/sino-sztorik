import { Link, useNavigate, useLocation } from "react-router-dom";

import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'

import { AppbarWrapper, ThemeChangeButton, TopbarButton } from './AppbarWrapper'
import './appbars.css';

const AdminAppbar = ({themeToggle, setLessonState}) => {

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const QuitAdminButton = () => (
        <Link to="/"><TopbarButton iconContent={<CloseIcon transform="scale(1.4)"/>} tooltip='Kilépés a leckeválasztóba (Esc)' /></Link>
    )

    const BackButton = () => {
        
        return (
        <TopbarButton textContent='Kezelőpult - főoldal' startIcon={<FontAwesomeIcon icon={faTools} />} 
        onClick={() => {setLessonState(null); navigate('/admin')}} />               
    )}

    return (
        <AppbarWrapper>
            {pathname !== '/admin' && <BackButton />}
            
            <Box display='flex' justifyContent='flex-end' alignItems='center' flex={1}>
                <ThemeChangeButton {...{themeToggle}} />
                <QuitAdminButton />
            </Box>
        </AppbarWrapper>
    )
}

export default AdminAppbar