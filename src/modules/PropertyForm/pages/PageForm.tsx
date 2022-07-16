import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Box, Button } from '@mui/material'

import { PropertyForm, PropertyFormProps} from '../'

export const PageForm: React.FC<PropertyFormProps> = (props) => {

  const methods = useForm()
  const { handleSubmit } = methods

  const navigate = useNavigate()
  const onClickGoLibrary = () => navigate('/lib')

  return (
    <Box sx={{
      marginTop: '64px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <FormProvider
        {...methods}
      >
        <PropertyForm
          onSubmit={handleSubmit((data) => props.onSubmit(data))}
        />
      </FormProvider>

      <Button
        sx={{
          width: '50%',
          marginTop: 1,
          marginBottom: 1
        }}
        variant={'contained'}
        color={'secondary'}
        onClick={onClickGoLibrary}
      >
        Go to library
      </Button>
    </Box>
  )
}

export default PageForm