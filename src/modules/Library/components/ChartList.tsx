import { Typography } from '@mui/material'

import { ChartListItem } from '.'

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
                        <ChartListItem key={Math.random()} item={stat} />
                    ))
                )
            }
        </>
    )
}

export default ChartList