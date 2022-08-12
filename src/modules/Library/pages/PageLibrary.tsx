import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { Typography, Box } from '@mui/material'

import { ChartList, ChartSearcher } from '../components'
import { GoBackButton } from '../../../components/UI'

import { useSavedStatsStore } from '../../../store/saveStatStore'
import { useLoggedInUser } from '../../../hooks'

import { ChartSearcherFormValues } from '../'

import { SavedStat } from '../../../components/BarChart'

export const PageLibrary: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  const loggedInUser = useLoggedInUser()

  const savedStatsStore = useSavedStatsStore()

  const [filteredStats, setFilteredStats] = useState<SavedStat[]>(savedStatsStore.savedStats)
  const [searchedBy, setSearchedBy] = useState(loggedInUser ? (loggedInUser?.username ? loggedInUser.username : loggedInUser?.email) : null)

  const params: any = { searchInput: '', withComments: false, searchedBy: '' }

  const navigate = useNavigate()
  const onClickGoHome = () => navigate('/')

  useEffect(() => {
    if (searchParams.get('searchedBy')) {
    const boolWithComments = searchParams.get('withComments') === 'true' ? true : false
    filterFunc({
      searchInput: searchParams.get('searchInput') as string,
      withComments: boolWithComments
    })
    searchParams.get('searchedBy') && setSearchedBy(searchParams.get('searchedBy'))
  }
  }, [])

  const methods = useForm<ChartSearcherFormValues>()
  const { handleSubmit, reset } = methods

  const filterFunc = (filterParams: ChartSearcherFormValues): void => {
    const filtered = savedStatsStore.savedStats.filter((stat) =>
      stat.houseType!.toLowerCase().includes(filterParams.searchInput?.toLowerCase() as string) ||
      stat.chartData!.labels![0].toLowerCase().includes(filterParams.searchInput?.toLowerCase() as string) ||
      stat.chartData!.labels![stat.chartData!.labels!.length - 1].toLowerCase().includes(filterParams.searchInput?.toLowerCase() as string) ||
      stat.statOwner!.toLowerCase().includes(filterParams.searchInput?.toLocaleLowerCase() as string))

    if (filterParams.withComments) {
      setFilteredStats(filtered.filter((stat) => stat.hasOwnProperty('comment')))
    } else {
      setFilteredStats(filtered.filter((stat) => !stat.hasOwnProperty('comment')))
    }
  }

  const filterStats: SubmitHandler<ChartSearcherFormValues> = (data) => {
    params.searchInput = data.searchInput
    params.withComments = data.withComments
    params.searchedBy = searchedBy
    setSearchParams(params)
    filterFunc(data)
  }

  const clearFilter = (): void => {
    setFilteredStats(savedStatsStore.savedStats)
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
        <ChartList savedStats={filteredStats} searchedBy={searchedBy as string} />
      </Box>
    </Box>
  )
}

export default PageLibrary