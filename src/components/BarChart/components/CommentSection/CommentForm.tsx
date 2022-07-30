import { useFormContext} from 'react-hook-form'

import { Button, Box, TextField } from '@mui/material'

interface CommentFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const CommentForm: React.FC<CommentFormProps> = (props) => {
    const methods = useFormContext()
    const { register, formState: { isDirty } } = methods
    const registeredDisplayNameProps = register('comment')

    return (
        <Box
            sx={{
                width: '100%',
                margin: 1.5,
            }}
        >
            <form onSubmit={props.onSubmit}>
                <TextField
                    sx={{
                        margin: 1
                    }}
                    multiline
                    maxRows={10}
                    variant={'standard'}
                    fullWidth
                    {...registeredDisplayNameProps}
                />
                <Button
                    sx={{
                        margin: 1,
                        width: '100%'
                    }}
                    disabled={!isDirty}
                    variant={'contained'}
                    color={'primary'}
                    type={'submit'}
                >
                    SAVE
                </Button>
            </form>
        </Box>
    )
}

export default CommentForm