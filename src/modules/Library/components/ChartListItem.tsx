import { TableRow, TableCell } from '@mui/material'

import { BarChart } from '../../../components/BarChart'
import { BasicModal } from '../../../components/UI'

import { ChartListItemProps } from '../types'

export const ChartlistItem: React.FC<ChartListItemProps> = (props) => {
    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:nth-of-type(odd)': { backgroundColor: '#EEEEEE' }
            }}
        >
            <TableCell component='th' scope='row' align='center'>
                {props.item.chartData!.labels![0]}
            </TableCell>
            <TableCell align='center'>
                {props.item.chartData!.labels![props.item.chartData!.labels!.length - 1]}
            </TableCell>
            <TableCell align='center'>{props.item.houseType}</TableCell>
            <TableCell align='center'>
                <BasicModal
                    buttonLabel={'Show more'}
                    printToConsole={`Type: ${props.item.houseType}, Date: ${props.item.chartData!.labels![0]} - ${props.item.chartData!.labels![props.item.chartData!.labels!.length - 1]}`}
                    modalBody={
                        <BarChart
                            labels={props.item.chartData.labels}
                            dataSet={props.item.chartData.datasets[0].data}
                            start={props.item.chartData!.labels![0]}
                            houseType={props.item.houseType}
                            end={props.item.chartData!.labels![props.item.chartData!.labels!.length - 1]}
                            showSaveBtn={false}
                            showCommentBtn={true}
                            id={props.item.id}
                        />
                    } />
            </TableCell>
            <TableCell data-cy={'table__cell__stat-owner'} align='center'>{props.item.statOwner}</TableCell>
        </TableRow>
    )
}

export default ChartlistItem