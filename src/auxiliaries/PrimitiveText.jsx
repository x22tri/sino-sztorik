import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube } from '@fortawesome/free-solid-svg-icons'

const PrimitiveText = ({ primitiveMeaning }) => {

    const theme = useTheme()

    return (
    <>
         <Box component='span' paddingRight='4px' sx={{color: theme.palette.tertiary.main}}>
            <FontAwesomeIcon icon={faCube}/>
         </Box>
         <Box component='span' sx={{color: theme.palette.tertiary.main}}>
            {primitiveMeaning}
         </Box>
    </>
)}

export default PrimitiveText