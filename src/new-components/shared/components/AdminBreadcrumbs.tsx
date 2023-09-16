import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Breadcrumbs, Link, Typography, useTheme } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function AdminBreadcrumbs({
  currentMenuItem,
  hierarchy,
}: {
  currentMenuItem: string
  hierarchy: { href: string; text: string }[]
}) {
  const { constants, palette, spacing } = useTheme()

  return (
    <Box
      alignItems='center'
      display='flex'
      height={spacing(4)}
      position='fixed'
      px={3}
      zIndex={1000}
      sx={{ bgcolor: 'background.default', borderBottom: `1px solid ${palette.grey[300]}`, width: 1 }}
    >
      <Box mx='auto' maxWidth={constants.maxContentWidth} width={1}>
        <Breadcrumbs separator={<FontAwesomeIcon icon={faChevronRight} size='xs' />}>
          {hierarchy.map(({ href, text }) => (
            <BreadcrumbLink key={href} {...{ href, text }} />
          ))}

          <Typography color='text.primary'>{currentMenuItem}</Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  )
}

function BreadcrumbLink({ href, text }: { href: string; text: string }) {
  return (
    <Link component={RouterLink} color='inherit' underline='hover' to={href} sx={{ ':hover': { backgroundColor: 'inherit' } }}>
      {text}
    </Link>
  )
}
