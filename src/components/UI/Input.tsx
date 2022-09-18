import React from 'react'

import { Box, TextField, MenuItem } from '@mui/material'

interface InputProps {
  errorMessage?: string;
  label: string;
  options: { value: string, label: string }[];
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    errorMessage,
    options,
    ...otherProps
  } = props

  return (
    <Box
      sx={{
        marginBottom: '8px',
        width: '100%'
      }}
      {...otherProps}
    >
      <TextField
        data-cy={'input__select'}
        select
        fullWidth
        defaultValue={''}
        label={props.label}
        error={props.errorMessage ? true : false}
        helperText={props.errorMessage ? props.errorMessage : null}
        {...otherProps}
      >
        {props.options.map((option) => (
          <MenuItem data-cy={'select__option'} key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    </Box>
  )
})

export default Input