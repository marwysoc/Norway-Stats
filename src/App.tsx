import './App.css'
import { useState } from 'react'
import axios from 'axios'
import { Routes, Route, useNavigate } from 'react-router-dom'
import DrawerAppBar from './components/AppBar/AppBar'

import PageForm from './pages/PageForm/PageForm'
import PageLibrary from './pages/PageLibrary/PageLibrary'
import PageChart from './pages/PageChart/PageChart'
import Loader from './components/Loader/Loader'
import Error from './components/Error/Error'

import { quarterSet } from './consts'
import { query } from './api/queryString'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [labels, setLabels] = useState<string[]>()
  const [prices, setPrices] = useState<number[]>()

  const navigate = useNavigate()

  const onClickSubmitHandler = async (data: any) => {
    setIsLoading(true)
    const start: string = `${data.startYear}K${data.startQuarter}`
    const end: string = `${data.endYear}K${data.endQuarter}`

    const startIndex: number = quarterSet.indexOf(start)
    const endIndex: number = quarterSet.indexOf(end)

    query.query[3].selection.values = quarterSet.slice(startIndex, endIndex + 1)
    query.query[1].selection.values[0] = data.houseType
    setLabels(query.query[3].selection.values)

    await axios.post("https://data.ssb.no/api/v0/en/table/05963", query)
      .then(response => {
        setPrices(response.data.value)
        const houseType = response.data.dimension.Boligtype.category.label[data.houseType]

        navigate(`/${start}-${end}/${houseType}`)
        setIsLoading(false)
      })
      .catch(error => {
        setHasError(true)
        setErrorMessage(error.message)
      })
  }

  return (
    <div className="App">
      <DrawerAppBar />
      <Routes>
        <Route
          path={'*'}
          element={
            <PageForm onClickSubmit={onClickSubmitHandler} />
          }
        />
        <Route
          path={'/lib'}
          element={
            <PageLibrary />
          }
        />
        <Route
          path={'/:start-:end/:house'}
          element={
            <PageChart labels={labels} dataSet={prices} />
          }
        />
      </Routes>
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
    </div >
  );
}

export default App;
