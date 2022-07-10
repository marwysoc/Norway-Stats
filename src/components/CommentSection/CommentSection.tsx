import { Box, Button } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import CommentForm from '../CommentForm/CommentForm'
import Comment from '../Comment/Comment'
import { useState, useEffect } from 'react'
import { ChartOptions } from 'chart.js'

interface CommentSectionProps {
    comment: string | null | undefined;
    id: any;
}

interface SavedStat {
    id: any,
    chartData: {
        labels: string[] | undefined;
        datasets: {
            label: string;
            data: number[] | undefined;
            backgroundColor: string[];
        }[];
    },
    options: ChartOptions,
    comment?: string
}

export const CommentSection: React.FC<CommentSectionProps> = (props) => {
    const [comment, setComment] = useState<string>(props.comment!)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [showComment, setShowComment] = useState<boolean>(false)
    const [txtCommentBtn, setTxtCommentBtn] = useState<string>(() => comment ? 'Show Comment' : 'Add comment')

    const savedStats: SavedStat[] = JSON.parse(localStorage.getItem('savedStats') || '[]') || []

    const methods = useForm({
        defaultValues: {
            comment: comment
        }
    })
    const { handleSubmit } = methods

    useEffect(() => {
        const index = savedStats.findIndex(
            (singleStat) => singleStat.id === props.id
        )
        savedStats[index].comment = comment
        localStorage.setItem('savedStats', JSON.stringify(savedStats))
    }, [comment, props, savedStats])

    const onClickSubmit = (data: any) => {
        if (data.comment) {
            setComment(data.comment)
            setShowForm(false)
            setShowComment(true)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '70%'
            }}>
            <Button
                variant={'outlined'}
                color={'primary'}
                disabled={showForm ? true : false}
                onClick={() => {
                    setShowForm(() => comment ? false : true)
                    setTxtCommentBtn(() => !showComment ? 'Hide Comment' : 'Show comment')
                    setShowComment(!showComment)
                }}
            >
                {txtCommentBtn}
            </Button>
            {
                showForm && (
                    <FormProvider
                        {...methods}
                    >
                        <CommentForm
                            onSubmit={handleSubmit((data) => onClickSubmit(data))}
                        />
                    </FormProvider>
                )
            }
            {
                showComment && (
                    <Comment
                        comment={comment}
                        onEditBtnClick={() => {
                            setShowForm(true)
                            setShowComment(false)
                        }}
                    />
                )
            }
        </Box>
    )
}

export default CommentSection