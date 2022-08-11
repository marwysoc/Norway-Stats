import "./App.css";

import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { Error, Loader } from "./components/UI";
import { PageLibrary } from "./modules/Library";
import { PageChart } from "./modules/PriceChart";
import { PageForm } from "./modules/PropertyForm";
import { useAppData } from "./useAppData";

const App: React.FC = () => {
  const {
    isLoading,
    isError,
    isFetching,
    errorMessage,
    labels,
    prices,
    onClickSubmitHandler,
    onDismissErrorClick,
  } = useAppData();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"*"} element={<PageForm />} />
        <Route path={"/lib"} element={<PageLibrary />} />
        <Route path={"/:start-:end/:house"} element={<PageChart />} />
      </Routes>
      {isLoading && isFetching ? <Loader /> : null}
      {isError ? (
        <Error
          errorMessage={`Error has occured: ${errorMessage}`}
          onButtonClick={onDismissErrorClick}
          buttonLabel={"Back to form"}
        />
      ) : null}
    </div>
  );
};

export default App;
