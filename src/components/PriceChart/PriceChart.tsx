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
import React, { useState, useEffect } from 'react'
import CommentSection from '../../components/CommentSection/CommentSection'
import { v4 as uuidv4 } from 'uuid'

import SnackBar from '../SnackBar/SnackBar'

interface DataSet {
    label: string;
    data?: number[];
    backgroundColor: string[];
}

interface SavedStat {
    id: any;
    houseType?: string;
    chartData: {
        labels?: string[];
        datasets: DataSet[];
    },
    options: ChartOptions,
    comment?: string
};

interface ChartProps {
    labels: string[] | undefined;
    dataSet: number[] | undefined;
    start: string | undefined;
    end: string | undefined;
    showSaveBtn: boolean;
    showCommentBtn: boolean;
    comment?: string | null | undefined;
    id?: any;
    houseType: string | undefined;
    key?: React.Key | null | undefined;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const PriceChart: React.FC<ChartProps> = React.memo(function PriceChart(props) {
    const [savedStats, setSavedStats] = useState<SavedStat[]>(() => JSON.parse(localStorage.getItem('savedStats') || '[]') || [])
    const [showSnackBar, setShowSnackbar] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false)

    useEffect(() => {
        localStorage.setItem('savedStats', JSON.stringify(savedStats))
    }, [savedStats])

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

    const onSaveClickHandler = (event: any) => {
        setDisabled(true)
        setShowSnackbar(true)
        const saveStat = {
            id: uuidv4(),
            houseType: props.houseType,
            chartData: chartData,
            options: options
        }
        setSavedStats((prevStats) => [...prevStats, saveStat])
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
                props.showSaveBtn && (
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

export default PriceChart