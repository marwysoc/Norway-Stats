import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { query } from "./api/queryString"
import { quarterSet } from "./consts"
import { getPropertyValues } from "./services"

const useAppData = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasError, setHasError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [labels, setLabels] = useState<string[]>()
    const [prices, setPrices] = useState<number[]>()

    const navigate = useNavigate()

    const onClickBtn = useCallback(() => {
        setHasError(false)
        setIsLoading(false)
    }, [])

    const onClickSubmitHandler = useCallback(async (data: any) => {
        setIsLoading(true)
        const start: string = `${data.startYear}K${data.startQuarter}`
        const end: string = `${data.endYear}K${data.endQuarter}`

        const startIndex: number = quarterSet.indexOf(start)
        const endIndex: number = quarterSet.indexOf(end)

        query.query[3].selection.values = quarterSet.slice(startIndex, endIndex + 1)
        query.query[1].selection.values[0] = data.houseType
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
    return { isLoading, hasError, errorMessage, labels, prices, onClickSubmitHandler, onClickBtn }
}

export { useAppData }