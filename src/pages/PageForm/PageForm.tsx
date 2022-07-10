import React from 'react'

import { useForm, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

import { Box } from '@mui/material'
import RangeForm from '../../components/RangeForm/RangeForm'

interface PageFormProps {
  onClickSubmit: (data: any) => void
}

export const PageForm: React.FC<PageFormProps> = (props) => {

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
        <RangeForm
          onSubmit={handleSubmit((data) => props.onClickSubmit(data))}
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