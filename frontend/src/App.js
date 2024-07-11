
import './App.css';
import AdminHome from './components/Admin/AdminHome';
import Home from './components/Landing Page/Home';
import Login from './components/Registration/Login';
import AdminRoute from './components/Admin/AdminRoute';
import Registration from './components/Registration/Registration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Buyer from './components/User/Buyer';
import Donor from './components/Donor/Donor';
import DonorProfile from './components/Donor/DonorProfile';
import BuyerRoute from './components/User/BuyerRoute';
import DonorRoute from './components/Donor/DonorRoute';
import Pets from './components/Admin/Pets';
import Category from './components/Admin/Category';
import Purchase from './components/Admin/Purchase';
import Users from './components/Admin/Users';
import DonorDetails from './components/Admin/DonorDetails';
import BuyerDetails from './components/Admin/BuyerDetails';
import DonationList from './components/Donor/DonationList';
import PurchaseList from './components/Donor/PurchaseList'
import Donation from './components/Donor/Donation';
import Notifications from './components/Admin/Notifications';

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
            <Route path='/users' element={ <Users /> }></Route>
            <Route path='/donordetails' element={ <DonorDetails /> }></Route>
            <Route path="/buyerdetails" element={<BuyerDetails />} />
            <Route path='/pets' element={ <Pets /> }></Route>
            <Route path='/category' element={ <Category /> }></Route>
            <Route path='/purchase' element={ <Purchase /> }></Route>
            <Route path='/adminnotifications' element={ <Notifications /> }></Route>
          </Route>
          <Route element={ <DonorRoute />}>
            <Route path='/donordashboard' element={ <Donor /> }></Route>
            <Route path='/donations' element={ <Donation /> }></Route>
            <Route path='/donorprofile' element={ <DonorProfile /> }></Route>
            <Route path='/donationlist' element={ <DonationList /> }></Route>
            <Route path='/purchaselist' element={ <PurchaseList /> }></Route>
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
