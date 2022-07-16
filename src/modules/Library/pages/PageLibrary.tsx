import { useNavigate } from 'react-router-dom'

import { Typography, Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { ChartList } from '../components'

import { SavedStat } from '../types'

export const PageLibrary: React.FC = () => {
  const savedStats: SavedStat[] = JSON.parse(localStorage.getItem('savedStats') || '[]') || []

  const navigate = useNavigate()
  const onClickGoHome = () => navigate('/')

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '68px',
        marginBottom: '64px'
      }}>
      <Button
        sx={{
          alignSelf: 'flex-start',
          marginLeft: 1.5
        }}
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={onClickGoHome}
      >
        Back to form
      </Button>
      <Typography
        variant='h4'
        gutterBottom
        component='div'>Library
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <ChartList savedStats={savedStats} />
      </Box>
    </Box>

  )
}

export default PageLibrary