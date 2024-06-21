
import './App.css';
import Home from './components/Landing Page/Home';
import Login from './components/Registration/Login';
import Registration from './components/Registration/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={ <Home /> }></Route>
          <Route path='/login' element={ <Login /> }></Route>
          <Route path='/registration' element={ <Registration /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
