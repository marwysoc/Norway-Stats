import { useState } from 'react'

import { Paper, Box, Typography, Button } from '@mui/material'

import { BarChart } from '../../../components/BarChart'

import { ChartListItemProps } from "../types"

export const ChartlistItem: React.FC<ChartListItemProps> = (props) => {
    const [showChart, setShowChart] = useState<boolean>(false)

    const onChartListItemClick = () => {
        setShowChart(!showChart)
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
                    padding: 2,
                    marginBottom: 1,
                    marginTop: 2
                }}>
                <Typography
                    variant='h6'
                    gutterBottom
                    component='div'
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{ fontWeight: 'bold', m: 1 }}>Quarters: </Box>
                    {props.item.chartData!.labels![0]} - {props.item.chartData!.labels![props.item.chartData!.labels!.length - 1]}

                    <Box sx={{ fontWeight: 'bold', m: 1 }}>House type: </Box>
                    {props.item.houseType}
                    <Button
                        sx={{
                            margin: 2
                        }}
                        variant={'contained'}
                        onClick={onChartListItemClick}
                    >
                        Show chart
                    </Button>
                </Typography>
            </Paper>
            {
                showChart &&
                <BarChart
                    labels={props.item.chartData.labels}
                    dataSet={props.item.chartData.datasets[0].data}
                    start={props.item.chartData!.labels![0]}
                    houseType={props.item.houseType}
                    end={props.item.chartData!.labels![props.item.chartData!.labels!.length - 1]}
                    showSaveBtn={false}
                    showCommentBtn={true}
                    comment={props.item.comment ? props.item.comment : null}
                    id={props.item.id}
                />
            }
        </Box>
    )
}

export default ChartlistItem