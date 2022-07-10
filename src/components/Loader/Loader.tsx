import { Box, CircularProgress } from '@mui/material'

export const Loader: React.FC = () => {
    return (
        <Box
            sx={{
              position: 'fixed',
              top: '0',
              left: '0',
              zIndex: '9999',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <CircularProgress />
          </Box>
    )
}

export default Loader