import './App.css'
import { Routes, Route } from 'react-router-dom'
import DrawerAppBar from './components/AppBar/AppBar'

import PageForm from './pages/PageForm/PageForm'
import PageLibrary from './pages/PageLibrary/PageLibrary'
import PageChart from './pages/PageChart/PageChart'
import Loader from './components/Loader/Loader'
import Error from './components/Error/Error'

import { useAppData } from './useAppData'


const App: React.FC = () => {
  const { isLoading, hasError, errorMessage, labels, prices, onClickSubmitHandler, onClickBtn } = useAppData()

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
            onButtonClick={onClickBtn}
          />
          :
          null
      }
    </div >
  );
}

export default App;
