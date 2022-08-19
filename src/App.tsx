import './App.css';

import { Route, Routes } from 'react-router-dom'

import { Header } from './components/Header'
import { PageLibrary } from './modules/Library'
import { PageChart } from './modules/PriceChart'
import { PageForm } from './modules/PropertyForm'
import UsersProfile from './modules/UsersProfile/UsersProfile'
import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'

const App: React.FC = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path={'*'} element={<PageForm />} />
        <Route path={'/lib'} element={<PageLibrary />} />
        <Route path={'/:start-:end/:house'} element={<PageChart />} />
        <Route path={'/login'} element={<LoginForm />} />
        <Route path={'/register'} element={<RegisterForm />} />
        <Route path={'/profile'} element={<UsersProfile />} />
      </Routes>
    </div>
  );
};

export default App;
