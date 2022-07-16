import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Box, Button } from '@mui/material'

import { Input } from '../../components/UI'
import { DescribeText, InputDescriber } from './components'

import { quarters, years, houses } from '../../consts'

import { PropertyFormProps } from '.'

export const PropertyForm: React.FC<PropertyFormProps> = (props) => {
  const {
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
      <DescribeText primaryTxt={'Welcome to Norawy Stats'} secondaryTxt={'Select range to get statistics'} />
      <form onSubmit={props.onSubmit}>
        <InputDescriber describerTxt={'Start quarter'}/>
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
        <InputDescriber describerTxt={'End quarter'}/>
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
        <InputDescriber describerTxt={'House Type'}/>
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

export default PropertyForm