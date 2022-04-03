import { Link } from "react-router-dom";

import { useTheme } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const AdminMainMenu = () => {
    const theme = useTheme()

    return (
        <Box display='flex' flexDirection='column' alignItems='center' margin='40px 0' gap={2}>
        <Link to='lesson-list'>
          <Button
              sx={{backgroundColor: theme.palette.tertiary.main, color: theme.palette.primary.contrastText,
              '&:hover': { backgroundColor: theme.palette.primary.lightPrimitive } }}
          >
              Leckék kezelése
          </Button>
          </Link>

            <Link to='similar-list/meaning'>
                <Button
                    sx={{backgroundColor: theme.palette.tertiary.main, color: theme.palette.primary.contrastText,
                    '&:hover': { backgroundColor: theme.palette.primary.lightPrimitive } }}
                >
                    Hasonló jelentésű karakterek
                </Button>
              </Link>

              <Link to='similar-list/appearance'>
                <Button
                    sx={{backgroundColor: theme.palette.tertiary.main, color: theme.palette.primary.contrastText,
                    '&:hover': { backgroundColor: theme.palette.primary.lightPrimitive } }}
                >
                    Hasonló kinézetű karakterek
                </Button>
              </Link>

            <Link to='phrase-list'>
              <Button
                  sx={{backgroundColor: theme.palette.tertiary.main, color: theme.palette.primary.contrastText,
                  '&:hover': { backgroundColor: theme.palette.primary.lightPrimitive } }}
              >
                  Kifejezéstár
              </Button>
            </Link>

            <Link to='other-use-list'>
              <Button
                  sx={{backgroundColor: theme.palette.tertiary.main, color: theme.palette.primary.contrastText,
                  '&:hover': { backgroundColor: theme.palette.primary.lightPrimitive } }}
              >
                  Egyéb jelentések
              </Button>
            </Link>
        </Box>
    )
}

export default AdminMainMenu