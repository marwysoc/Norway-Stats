import { useNavigate, useParams } from 'react-router-dom'

import { Box } from '@mui/material'

import { Loader, Error, GoBackButton } from '../../../components/UI'

import { BarChart } from '../../../components/BarChart'
import { ChartProps } from '../'

import { houses } from '../../../consts'

import { usePageChartData } from '../hooks'
import { makeQuery } from '../../../utils'

export const PageChart: React.FC<ChartProps> = (props) => {
    const { start, end, house } = useParams();
    const houseType = houses.filter((h: { value: string, label: string }) => h.label === house)[0].value
    const { query } = makeQuery(start!, end!, houseType!)
    const { isLoading, hasError, errorMessage, labels, prices, onDismissErrorClick } = usePageChartData(props.labels, props.dataSet, query)

    const navigate = useNavigate()
    const onClickGoHome = () => navigate('/')

    return (
        <>
            <Box
                sx={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '68px',
                    marginBottom: '64px'
                }}>
                <GoBackButton
                    sx={{
                        alignSelf: 'flex-start',
                        marginLeft: 1.5
                    }}
                    onClickGoBack={onClickGoHome}
                    label={'Back to form'}
                />
                <BarChart labels={labels} dataSet={prices} houseType={house} start={start} end={end} showSaveBtn={true} showCommentBtn={false} />
            </Box>
            {
                isLoading ? <Loader /> : null
            }
            {
                hasError ?
                    <Error
                        buttonLabel={'Go back'}
                        errorMessage={`Error has occured: ${errorMessage}`}
                        onButtonClick={onDismissErrorClick}
                    />
                    :
                    null
            }
        </>
    )
}

export default PageChart