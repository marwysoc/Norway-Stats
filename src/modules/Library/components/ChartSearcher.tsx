import { useFormContext } from 'react-hook-form'
import { Box, Button, TextField } from '@mui/material'

import { CheckBox } from '../../../components/UI'

interface ChartSearcherProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    resetForm: any;
}

export const ChartSearcher: React.FC<ChartSearcherProps> = (props) => {

    const methods = useFormContext()
    const { register } = methods

    const registerSearchInput = register('searchInput')
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
                    <TextField
                        data-cy={'input__stat-search'}
                        label={'Search'}
                        variant={'standard'}
                        fullWidth
                        {...registerSearchInput}
                    />
                    <CheckBox
                        data-cy={'checkbox__with-comments'}
                        label={'with comments'}
                        {...registerWithComments}
                    />

                    <Button
                        data-cy={'button__stat-search-submit'}
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