import { Typography } from '@mui/material'

import { InputDescriberProps } from '..'

export const InputDescriber: React.FC<InputDescriberProps> = (props) => {
    return (
        <Typography variant='button' gutterBottom component='div' sx={{ fontWeight: 'bold' }}>
            {props.describerTxt}
        </Typography>
    )
}

export default InputDescriber