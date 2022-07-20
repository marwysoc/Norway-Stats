import { useNavigate } from 'react-router-dom'

import { Typography, Box } from '@mui/material'

import { ChartList } from '../components'
import { GoBackButton } from '../../../components/UI'

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
      <GoBackButton
        sx={{
          alignSelf: 'flex-start',
          marginLeft: 1.5
        }}
        onClickGoBack={onClickGoHome}
        label={'Back to form'}
      />
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