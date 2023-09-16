import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

export function AdminDashboard() {
  return (
    <Box display='flex' flexDirection='column'>
      Admin dashboard
      <Link to='/admin/characters'>Karakterek</Link>
      <Link to='/admin/lessons'>Leckék</Link>
    </Box>
  )
}
