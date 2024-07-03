
import './App.css';
import AdminHome from './components/Admin/AdminHome';
import Home from './components/Landing Page/Home';
import Login from './components/Registration/Login';
import AdminRoute from './components/Admin/AdminRoute';
import Registration from './components/Registration/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Buyer from './components/User/Buyer';
import Donor from './components/Donor/Donor';
import BuyerRoute from './components/User/BuyerRoute';
import DonorRoute from './components/Donor/DonorRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={ <Home /> }></Route>
          <Route path='/login' element={ <Login /> }></Route>
          <Route path='/registration' element={ <Registration /> }></Route>

          <Route element={ <AdminRoute />}>
            <Route path='/admindashboard' element={ <AdminHome /> }></Route>
          </Route>
          <Route element={ <DonorRoute />}>
            <Route path='/donordashboard' element={ <Donor /> }></Route>
          </Route>
          <Route element={ <BuyerRoute />}>
            <Route path='/buyerdashboard' element={ <Buyer /> }></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
