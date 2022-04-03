import { useTheme } from '@mui/system';
import Box from '@mui/material/Box';

const ListWrapper = ({title, children}) => {
    const theme = useTheme()

    return (
        <Box margin='20px'>
            <Box margin='0 0 20px 5px' sx={{ typography: 'mainPageSecondaryHeading' }}>{title}</Box>
            <Box sx={{
                '& .MuiDataGrid-row:hover': { backgroundColor: theme.palette.background.charSelectAdmin, cursor: 'pointer' },
                '& .MuiDataGrid-root, .MuiDataGrid-cell': { borderColor: theme.palette.divider },
                '& .data-grid-tier-bg--1': { backgroundColor: theme.palette.background.tierOneChar },
                '& .data-grid-tier-bg--2': { backgroundColor: theme.palette.background.tierTwoChar }, 
                '& .data-grid-tier-bg--3': { backgroundColor: theme.palette.background.tierThreeChar },
                '& .data-grid-tier-bg--4': { backgroundColor: theme.palette.background.tierFourChar }, 
                '& .data-grid-tier-bg--5': { backgroundColor: theme.palette.background.remainderChar },
                '& .data-grid--edited': { backgroundColor: theme.palette.background.dataGridEdited } }}
            >
            {children}
            </Box>
        </Box>
    )
}

export default ListWrapper
