import { useNavigate, useParams } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { PriceChart } from '../../components/PriceChart/PriceChart'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Loader from '../../components/Loader/Loader'
import { quarterSet, houses } from '../../consts'
import { query } from '../../api/queryString'
import { useEffect, useState } from 'react'
import Error from '../../components/Error/Error'
import axios from 'axios'

interface ChartProps {
    labels: string[] | undefined;
    dataSet: number[] | undefined;
}

export const PageChart: React.FC<ChartProps> = (props) => {
    const { start, end, house } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [labels, setLabels] = useState<string[]>(() => props.labels ? props.labels : [])
    const [prices, setPrices] = useState<number[]>(() => props.dataSet ? props.dataSet : [])

    const navigate = useNavigate()
    const onClickGoHome = () => navigate('/')

    useEffect(() => {
        if (props.labels === undefined || props.dataSet === undefined) {
            setIsLoading(true)
            const startIndex: number = quarterSet.indexOf(start!)
            const endIndex: number = quarterSet.indexOf(end!)
            const houseType = houses.filter((h) => h.label === house)

            query.query[3].selection.values = quarterSet.slice(startIndex, endIndex + 1)
            query.query[1].selection.values[0] = houseType[0].value
            setLabels(query.query[3].selection.values)

            async function fetchData() {
                await axios.post("https://data.ssb.no/api/v0/en/table/05963", query)
                    .then((response) => {
                        setPrices(response.data.value)
                        setIsLoading(false)
                    })
                    .catch(error => {
                        setHasError(true)
                        setErrorMessage(error.message)
                    })
            }
            fetchData()
        } else {
            setIsLoading(false)
        }
    }, [])

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
                <Button
                    sx={{
                        alignSelf: 'flex-start',
                        marginLeft: 1.5
                    }}
                    variant={'text'}
                    color={'primary'}
                    startIcon={<ArrowBackIcon />}
                    onClick={onClickGoHome}
                >
                    Back to form
                </Button>
                <PriceChart labels={labels} dataSet={prices} houseType={house} start={start} end={end} showSaveBtn={true} showCommentBtn={false} />
            </Box>
            {
                isLoading ? <Loader /> : null
            }
            {
                hasError ?
                    <Error
                        errorMessage={`Error has occured: ${errorMessage}`}
                        onButtonClick={() => {
                            setHasError(false)
                            setIsLoading(false)
                        }}
                    />
                    :
                    null
            }
        </>
    )
}

export default PageChart