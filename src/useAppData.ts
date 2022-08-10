import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { SubmitHandler } from 'react-hook-form'

import { makeQuery } from './utils'
import { getPropertyValues } from './services'

interface FormValues {
    startYear: string;
    endYear: string;
    startQuarter: string;
    endQuarter: string;
    houseType: string;
}

interface AppDataValues {
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    errorMessage?: string;
    labels?: string[];
    prices?: number[];
    onClickSubmitHandler: any;
    onDismissErrorClick: () => void;
}

const useAppData: () => AppDataValues = () => {
    const [errorMessage, setErrorMessage] = useState<string>('')

    const [labels, setLabels] = useState<string[]>()
    const [prices, setPrices] = useState<number[]>()
    const [query, setQuery] = useState<any>()

    const navigate = useNavigate()

    const { data: propertyValues, isLoading, isError, isFetching,  isSuccess, error, refetch } = useQuery<any, Error>(
        ['propertyValues', query],
        () => getPropertyValues(query),
        {
            enabled: false,
        }
    )

    if (isError) {
        setErrorMessage(error.message)
    }

    const onDismissErrorClick: () => void = useCallback(() => {
        navigate('/')
    }, [])

    const onClickSubmitHandler: SubmitHandler<FormValues> = useCallback(async (formData) => {
        const start: string = `${formData.startYear}K${formData.startQuarter}`
        const end: string = `${formData.endYear}K${formData.endQuarter}`
        const { query: queryString } = makeQuery(start, end, formData.houseType)

        setQuery(queryString)
        //console.log(query)
        setLabels(query.query[3].selection.values)
        //console.log(labels)

        try {
            //const propertyValues = await getPropertyValues(query)
            await refetch()
            if (isSuccess && !isFetching) {
                setPrices(propertyValues.data.value)
                const houseType = propertyValues.data.dimension.Boligtype.category.label[formData.houseType]

                navigate(`/${start}-${end}/${houseType}`)
            }
        } catch (error: any) {
            setErrorMessage(error.message)
            console.log(error.message)
        }

    }, [query, navigate, refetch, propertyValues, isSuccess, isFetching])

    return { isLoading, isError, isFetching, errorMessage, labels, prices, onClickSubmitHandler, onDismissErrorClick }
}

export { useAppData }