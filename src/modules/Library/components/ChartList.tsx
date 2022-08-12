import {
    Typography, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material'

import { ChartListItem } from '.'
import { SavedStat } from '../../../components/BarChart'

interface ChartListProps {
    savedStats: SavedStat[];
    searchedBy?: string;
}

export const ChartList: React.FC<ChartListProps> = (props) => {
    return (
        <>
            {
                props.savedStats.length === 0 ? (
                    <Typography
                        variant='h6'
                        gutterBottom
                        component='div'>No statistics found. Go to form page to generate some and save them.
                    </Typography>
                ) : (
                    <>
                        {
                            props.searchedBy !== 'null' &&
                            <Typography variant={'subtitle1'} sx={{ marginTop: 2 }}>
                                {`Searched by: ${props.searchedBy}`}
                            </Typography>
                        }
                        <TableContainer component={Paper} sx={{ width: '80vw', marginTop: 6 }}>
                            <Table sx={{ width: '100%' }} aria-label='simple table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>Start quarter</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>End quarter</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>House Type</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>Details</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }} align='center'>Owner</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.savedStats.map((stat: SavedStat) => (
                                            <ChartListItem key={Math.random()} item={stat} />
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )
            }
        </>
    )
}

export default ChartList