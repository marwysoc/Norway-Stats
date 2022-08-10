import { Routes, Route } from 'react-router-dom'

import { PageForm } from './modules/PropertyForm'
import { PageChart } from './modules/PriceChart'
import { PageLibrary } from './modules/Library'

import { Loader, Error } from './components/UI'
import { Header } from './components/Header'

import { useAppData } from './useAppData'

import './App.css'

const App: React.FC = () => {
  const { isLoading, isError, isFetching, errorMessage, labels, prices, onClickSubmitHandler, onDismissErrorClick } = useAppData()

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
        (isLoading && isFetching) ? <Loader /> : null
      }
      {
        isError ?
          <Error
            errorMessage={`Error has occured: ${errorMessage}`}
            onButtonClick={onDismissErrorClick}
            buttonLabel={'Back to form'}
          />
          :
          null
      }
    </div >
  );
}

export default App;
