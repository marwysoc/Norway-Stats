import React, { useState } from 'react'

import { Paper, Typography, Button, Box } from '@mui/material'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ChartOptions } from 'chart.js'

import { v4 as uuidv4 } from 'uuid'

import { CommentSection } from './components/CommentSection'
import { SnackBar } from '../UI'

import { ChartProps } from './'

import { useSavedStatsStore } from '../../store'
import { useLoggedInUser } from '../../hooks'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const BarChart: React.FC<ChartProps> = React.memo(function BarChart(props) {
    const [showSnackBar, setShowSnackbar] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false)

    const { addStat } = useSavedStatsStore()
    const loggedInUser = useLoggedInUser()

    const chartData = {
        labels: props.labels,
        datasets: [
            {
                label: 'Price [NOK]',
                data: props.dataSet,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 1255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }
        ]
    }

    const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            title: {
                display: true,
                text: `${props.houseType}`,
            },
        },
    }

    const onSaveClickHandler: () => void = () => {
        setDisabled(true)
        setShowSnackbar(true)
        const statToSave = {
            id: uuidv4(),
            houseType: props.houseType,
            chartData: chartData,
            options: options,
            statOwner: 'Marta'
        }
        addStat(statToSave)
        setTimeout(() => {
            setShowSnackbar(false)
        }, 1500)
    }

    return (
        <Box
            sx={{
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Paper
                elevation={10}
                sx={{
                    width: '90%',
                    height: 'auto',
                    padding: 6,
                    marginBottom: 2,
                    marginTop: 4
                }}>
                <Typography variant='h6'>{`Average Prices in Oslo (${props.start}-${props.end})`}</Typography>
                <Bar
                    data={chartData}
                    options={options}
                />
            </Paper>
            {
                props.showCommentBtn &&
                <CommentSection comment={props.comment} id={props.id} />
            }
            {
                props.showSaveBtn && loggedInUser && (
                    <>
                        <Button
                            variant='contained'
                            color='secondary'
                            disabled={disabled}
                            onClick={onSaveClickHandler}
                        >
                            Save statistics
                        </Button>
                        <SnackBar
                            isOpen={showSnackBar}
                            message={'Saved in library!'}
                        />
                    </>
                )
            }
        </Box>
    )
})

export default BarChart