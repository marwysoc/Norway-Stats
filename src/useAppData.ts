import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { makeQuery } from './utils'
import { getPropertyValues } from './services'

const useAppData = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [labels, setLabels] = useState<string[]>()
    const [prices, setPrices] = useState<number[]>()

    const navigate = useNavigate()

    const onDismissErrorClick = useCallback(() => {
        setHasError(false)
        setIsLoading(false)
    }, [])

    const onClickSubmitHandler = useCallback(async (data: any) => {
        setIsLoading(true)
        const start: string = `${data.startYear}K${data.startQuarter}`
        const end: string = `${data.endYear}K${data.endQuarter}`

        const { query } = makeQuery(start, end, data.houseType)

        setLabels(query.query[3].selection.values)

        try {
            const propertyValues = await getPropertyValues(query)
            setPrices(propertyValues.data.value)
            const houseType = propertyValues.data.dimension.Boligtype.category.label[data.houseType]

            navigate(`/${start}-${end}/${houseType}`)
            setIsLoading(false)
        } catch (error: any) {
            setHasError(true)
            setErrorMessage(error.message)
        }
    }, [navigate])
    return { isLoading, hasError, errorMessage, labels, prices, onClickSubmitHandler, onDismissErrorClick }
}

export { useAppData }