import { Typography } from '@mui/material'

import { BarChart } from '../../../components/BarChart'

export const ChartList: React.FC<any> = (props) => {
    return (
        <>
            {
                props.savedStats.length === 0 ? (
                    <Typography
                        variant='h6'
                        gutterBottom
                        component='div'>No statistics in the library. Go to form page to generate some and save them.
                    </Typography>
                ) : (
                    props.savedStats.map((stat: any) => (
                        <BarChart
                            key={Math.random()}
                            labels={stat.chartData.labels}
                            dataSet={stat.chartData.datasets[0].data}
                            start={stat.chartData!.labels![0]}
                            houseType={stat.houseType}
                            end={stat.chartData!.labels![stat.chartData!.labels!.length - 1]}
                            showSaveBtn={false}
                            showCommentBtn={true}
                            comment={stat.comment ? stat.comment : null}
                            id={stat.id}
                        />
                    ))
                )
            }
        </>
    )
}

export default ChartList