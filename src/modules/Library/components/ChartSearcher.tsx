import { useFormContext } from 'react-hook-form'
import { Box, Button } from '@mui/material'

import { Input, CheckBox } from '../../../components/UI'

import { houses } from '../../../consts'

interface ChartSearcherProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    resetForm: any;
}

export const ChartSearcher: React.FC<ChartSearcherProps> = (props) => {
    const VALUE_REQUIRED_ERROR = 'This Value is required'

    const methods = useFormContext()
    const { register, formState: { errors } } = methods

    const registerHouseType = register('houseType', {
        required: {
          value: true,
          message: VALUE_REQUIRED_ERROR
        }
      })
    const registerWithComments = register('withComments')

    return (
        <form onSubmit={props.onSubmit}>
            <Box
                sx={{
                    width: '80vw'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Input
                        label={'House type'}
                        errorMessage={errors.houseType && errors.houseType.message}
                        options={houses}
                        {...registerHouseType}
                    />
                    <CheckBox
                        label={'with comments'}
                        {...registerWithComments}
                    />

                <Button
                    variant={'contained'}
                    color={'primary'}
                    type={'submit'}
                    sx={{
                        width: '100%',
                        margin: 1
                    }}
                >
                    SEARCH
                </Button>
                <Button
                    variant={'contained'}
                    color={'secondary'}
                    onClick={props.resetForm}
                    sx={{
                        width: '100%',
                        margin: 1
                    }}
                >
                    CLEAR FILTER
                </Button>
                </Box>
            </Box>
        </form >
    )
}

export default ChartSearcher