import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'

interface BasicModalProps {
    buttonLabel: string;
    modalBody: React.ReactNode;
    printToConsole?: string;
}

export const BasicModal: React.FC<BasicModalProps> = (props) => {
    const [open, setOpen] = useState(false)
    const handleOpen: () => void = () => {
        setOpen(true)
        console.log(props.printToConsole)
    }
    const handleClose: () => void = () => setOpen(false)

    return (
        <Box>
            <Button
                data-cy={'button__open-modal'}
                sx={{
                    margin: 2
                }}
                size={'small'}
                variant={'contained'}
                onClick={handleOpen}
            >
                {props.buttonLabel}
            </Button>
            <Modal
                sx={{ overflow: 'scroll' }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80vw',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        p: 2
                    }}
                >
                    {props.modalBody}
                </Box>
            </Modal>
        </Box>
    )
}

export default BasicModal
