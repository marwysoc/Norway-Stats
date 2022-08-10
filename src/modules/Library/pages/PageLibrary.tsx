import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { Typography, Box } from '@mui/material'

import { ChartList, ChartSearcher } from '../components'
import { GoBackButton } from '../../../components/UI'

import { ChartSearcherFormValues } from '../'

import { SavedStat } from '../../../components/BarChart'

export const PageLibrary: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const savedStats: SavedStat[] = JSON.parse(localStorage.getItem('savedStats') || '[]') || []
  const [filteredStats, setFilteredStats] = useState<SavedStat[]>(savedStats)

  const params: any = { searchInput: '', withComments: false }

  const navigate = useNavigate()
  const onClickGoHome = () => navigate('/')

  useEffect(() => {
    if (searchParams) {
      const boolWithComments = searchParams.get('withComments') === 'true' ? true : false
      filterFunc({
        searchInput: searchParams.get('searchInput') as string,
        withComments: boolWithComments
      })
    }
  }, [])

  const methods = useForm<ChartSearcherFormValues>()
  const { handleSubmit, reset } = methods

  const filterFunc = (filterParams: ChartSearcherFormValues): void => {
    const filtered = savedStats.filter((stat) =>
      stat.houseType!.toLowerCase().includes(filterParams.searchInput as string) ||
      stat.chartData!.labels![0].toLowerCase().includes(filterParams.searchInput as string) ||
      stat.chartData!.labels![stat.chartData!.labels!.length - 1].toLowerCase().includes(filterParams.searchInput as string) ||
      stat.statOwner.toLowerCase().includes(filterParams.searchInput as string))

    if (filterParams.withComments) {
      setFilteredStats(filtered.filter((stat) => stat.hasOwnProperty('comment')))
    } else {
      setFilteredStats(filtered.filter((stat) => !stat.hasOwnProperty('comment')))
    }
  }

  const filterStats: SubmitHandler<ChartSearcherFormValues> = (data) => {
    params.searchInput = data.searchInput
    params.withComments = data.withComments
    setSearchParams(params)
    filterFunc(data)
  }

  const clearFilter = (): void => {
    setFilteredStats(savedStats)
    reset()
    navigate('/lib')
  }

  return (
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
      <Typography
        variant='h4'
        gutterBottom
        component='div'>Library
      </Typography>
      <FormProvider
        {...methods}
      >
        <ChartSearcher
          onSubmit={handleSubmit(filterStats)}
          resetForm={clearFilter}
        />
      </FormProvider>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <ChartList savedStats={filteredStats} />
      </Box>
    </Box>
  )
}

export default PageLibrary