import { Typography } from '@mui/material'

import { ChartListItem } from '.'
import { SavedStat } from '../types'

interface ChartListProps {
    savedStats: SavedStat[]
}

export const ChartList: React.FC<ChartListProps> = (props) => {
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
                    props.savedStats.map((stat: SavedStat) => (
                        <ChartListItem key={Math.random()} item={stat} />
                    ))
                )
            }
        </>
    )
}

export default ChartList