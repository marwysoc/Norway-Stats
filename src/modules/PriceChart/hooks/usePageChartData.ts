import { useState, useEffect, useCallback } from 'react'

import { getPropertyValues } from '../../../services'

const usePageChartData = (labelArray?: string[], dataSet?: number[], query?: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasError, setHasError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [labels, setLabels] = useState<string[]>(() => labelArray ? labelArray : [])
    const [prices, setPrices] = useState<number[]>(() => dataSet ? dataSet : [])

    const onDismissErrorClick = useCallback(() => {
        setHasError(false)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (labels === undefined || dataSet === undefined) {
            setIsLoading(true)
            setLabels(query.query[3].selection.values)

            async function fetchData() {
                try {
                    const propertyValues = await getPropertyValues(query)
                    setPrices(propertyValues.data.value)
                    setIsLoading(false)
                } catch (error: any) {
                    setHasError(true)
                    setErrorMessage(error.message)
                }
            }
            fetchData()
        } else {
            setIsLoading(false)
        }
    }, [])

    return { isLoading, hasError, errorMessage, labels, prices, onDismissErrorClick }
}

export { usePageChartData }