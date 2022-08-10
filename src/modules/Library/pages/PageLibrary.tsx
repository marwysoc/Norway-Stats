import { useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { Typography, Box } from '@mui/material'

import { ChartList, ChartSearcher } from '../components'
import { GoBackButton } from '../../../components/UI'

import { ChartSearcherFormValues } from '../'

import { SavedStat } from '../../../components/BarChart'

export const PageLibrary: React.FC = () => {
  const savedStats: SavedStat[] = JSON.parse(localStorage.getItem('savedStats') || '[]') || []
  const [filteredStats, setFilteredStats] = useState<SavedStat[]>(savedStats)
  const params: any = { search: '', withComments: false }

  const navigate = useNavigate()
  const onClickGoHome = () => navigate('/')

  const goFilterUrl = () =>
    navigate({
      pathname: '/lib',
      search: `?${createSearchParams(params)}`,
    })

  const methods = useForm<ChartSearcherFormValues>()
  const { handleSubmit, reset } = methods

  const filterFunc = (filterParams: ChartSearcherFormValues): void => {
    const filtered = savedStats.filter((stat) =>
      stat.houseType!.toLowerCase().includes(filterParams.searchInput) ||
      stat.chartData!.labels![0].toLowerCase().includes(filterParams.searchInput) ||
      stat.chartData!.labels![stat.chartData!.labels!.length - 1].toLowerCase().includes(filterParams.searchInput) ||
      stat.statOwner.toLowerCase().includes(filterParams.searchInput)
    )

    if (filterParams.withComments) {
      setFilteredStats(filtered.filter((stat) => stat.hasOwnProperty('comment')))
    } else {
      setFilteredStats(filtered.filter((stat) => !stat.hasOwnProperty('comment')))
    }
  }

  const filterStats: SubmitHandler<ChartSearcherFormValues> = (data) => {
    params.searchInput = data.searchInput
    params.withComments = data.withComments
    filterFunc(data)
    goFilterUrl()
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