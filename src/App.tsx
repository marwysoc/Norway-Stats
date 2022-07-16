import { Routes, Route } from 'react-router-dom'

import { PageForm } from './modules/PropertyForm'
import { PageChart } from './modules/PriceChart'
import { PageLibrary } from './modules/Library'

import { Loader, Error } from './components/UI'
import { Header } from './components/Header'

import { useAppData } from './useAppData'

import './App.css'

const App: React.FC = () => {
  const { isLoading, hasError, errorMessage, labels, prices, onClickSubmitHandler, onClickBtn } = useAppData()

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path={'*'}
          element={
            <PageForm onSubmit={onClickSubmitHandler} />
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
            onButtonClick={onClickBtn}
          />
          :
          null
      }
    </div >
  );
}

export default App;
