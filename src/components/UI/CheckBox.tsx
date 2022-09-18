import React from 'react'

import { Box, Checkbox, FormControl, FormControlLabel } from '@mui/material'

interface CheckBoxProps {
    errorMessage?: string;
    label: string;
}

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
    const {
        label,
        ...otherProps
    } = props

    return (
        <Box
            sx={{
                marginBottom: '8px',
                width: '100%'
            }}
        >
            <FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            data-cy={'checkbox'}
                            defaultChecked={false}
                            color={'primary'}
                        />
                    }
                    data-cy={'label__checkbox'}
                    label={props.label}
                    inputRef={ref}
                    {...otherProps}
                />
            </FormControl>
        </Box>
    )
})

export default CheckBox