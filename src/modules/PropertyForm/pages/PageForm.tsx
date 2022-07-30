import React from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Box, Button } from '@mui/material'

import { PropertyForm } from '../components'
import { PropertyFormProps, FormValues } from '../'

export const PageForm: React.FC<PropertyFormProps> = (props) => {

  const methods = useForm<FormValues>()
  const { handleSubmit } = methods

  const navigate = useNavigate()
  const onClickGoLibrary = () => navigate('/lib')

  const submitForm: SubmitHandler<FormValues> = (data) => props.onSubmit(data)

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
          onSubmit={handleSubmit(submitForm)}
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