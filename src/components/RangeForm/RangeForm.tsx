import React from 'react'

import { Box, Button, Typography } from '@mui/material'

import { useFormContext } from 'react-hook-form'

import { Input } from '../UI'

import { quarters, years, houses } from '../../consts'

interface RangeFormProps {
  onSubmit: any
}

export const QuarterForm: React.FC<RangeFormProps> = (props) => {
  const {
    onSubmit,
    ...otherProps
  } = props

  const VALUE_REQUIRED_ERROR = "This Value is required"

  const methods = useFormContext()
  const { register, formState: { errors } } = methods

  const registerStartYear = register('startYear', {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR
    }
  })

  const registerStartQuarter = register('startQuarter', {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR
    }
  })

  const registerEndYear = register('endYear', {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR
    }
  })

  const registerEndQuarter = register('endQuarter', {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR
    }
  })

  const registerHouseType = register('houseType', {
    required: {
      value: true,
      message: VALUE_REQUIRED_ERROR
    }
  })

  return (
    <Box
      sx={{
        margin: '10px',
        display: 'block',
        width: '50%'
      }}
      {...otherProps}
    >
      <Typography variant='h3' component='div'>
        Welcome to Norawy Stats
      </Typography>
      <Typography sx={{ marginBottom: 2 }} variant='subtitle1' gutterBottom component='div'>
        Select range to get statistics
      </Typography>
      <form onSubmit={props.onSubmit}>
        <Typography variant='button' gutterBottom component='div' sx={{ fontWeight: 'bold' }}>
          Start quarter
        </Typography>
        <Input
          label={'Start year'}
          errorMessage={errors.startYear && errors.startYear.message}
          options={years}
          {...registerStartYear}
        />
        <Input
          label={'Start quarter'}
          errorMessage={errors.startQuarter && errors.startQuarter.message}
          options={quarters}
          {...registerStartQuarter}
        />
        <Typography variant='button' gutterBottom component='div' sx={{ fontWeight: 'bold' }}>
          End quarter
        </Typography>
        <Input
          label={'End year'}
          errorMessage={errors.endYear && errors.endYear.message}
          options={years}
          {...registerEndYear}
        />
        <Input
          label={'End quarter'}
          errorMessage={errors.endQuarter && errors.endQuarter.message}
          options={quarters}
          {...registerEndQuarter}
        />
        <Typography variant='button' gutterBottom component='div' sx={{ fontWeight: 'bold' }}>
          House Type
        </Typography>
        <Input
          label={'House type'}
          errorMessage={errors.houseType && errors.houseType.message}
          options={houses}
          {...registerHouseType}
        />
        <Button
          variant={'contained'}
          color={'primary'}
          type={'submit'}
          sx={{
            width: '100%',
            marginTop: 2,
            marginBottom: 1
          }}
        >
          GET STATISTICS
        </Button>
      </form >
    </Box >
  )
}

export default QuarterForm