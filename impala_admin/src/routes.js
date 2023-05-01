import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import Clients from './pages/pages/Clients';
 
import DashboardApp from './pages/DashboardApp';
 
import NotFound from './pages/Page404';
  
import AddNewClient from './pages/pages/AddNewClient';
 
import MyProfile from './pages/pages/MyProfile';
 

import Settings from './pages/pages/Settings';
import Users from './pages/pages/Users';
import Transactions from './pages/pages/Transactions';
import Cars from './pages/pages/Cars';
import Hospitals from './pages/pages/Hospitals';
import Bookings from './pages/pages/Bookings';
import AddNewCar from './pages/pages/AddNewCar';
import VIewCar from './pages/pages/VIewCar';
import ViewHospital from './pages/pages/ViewHospital';
import EditHospital from './pages/pages/EditHospital';
import EditCar from './pages/pages/EditCar';
import ViewUser from './pages/pages/users/ViewUser';
import ViewBooking from './pages/pages/users/ViewBooking';
import Extras from './pages/pages/Extras';
import Admin from './pages/pages/Admin';
import Calendar from './pages/pages/Calendar';
import Messaging from './pages/pages/Messaging';
import Coupons from './pages/pages/Coupons';
import AddNewBooking from './pages/pages/AddNewBooking';
import Quotations from './pages/pages/Quotations';
import AddNewHospital from './pages/pages/AddNewHospital';
 
// ----------------------------------------------------------------------

export default function Router() {

  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children:  
      [
        { path: '/', element: <DashboardApp /> },
  
        {path: '/settings/', element: <Settings />} ,
        {path: '/clients/', element: <Clients />} ,
        {path: '/users/', element: <Users />} ,
        {path: '/addNewBooking/', element: <AddNewBooking />} ,
        {path: '/quotations/', element: <Quotations />} ,
        {path: '/coupons/', element: <Coupons />} ,
        {path: '/calendar/', element: <Calendar />} ,
        {path: '/messaging/', element: <Messaging />} ,
        { path: '/viewUser/:id', element:  <ViewUser /> },  
        { path: '/viewBooking/:id', element:  <ViewBooking /> },  
        {path: '/addClient', element: <AddNewClient />} ,
        {path: '/addCar', element: <AddNewCar />} ,
        {path: '/addHospital', element: <AddNewHospital />} ,
        { path: '/viewCar/:id', element:  <VIewCar /> },
        { path: '/viewHospital/:id', element:  <ViewHospital /> },  
        { path: '/editCar/:id', element:  <EditCar /> },
        { path: '/editHospital/:id', element:  <EditHospital /> },  
        {path: '/bookings/', element: <Bookings />} ,
        {path: '/extras/', element: <Extras />} ,
        {path: '/admin/', element: <Admin />} ,
        {path: '/cars/', element: <Cars />} ,
        {path: '/hospitals/', element: <Hospitals />} ,
        {path: '/transactions/', element: <Transactions />} ,
          { path: '/profile', element:  <MyProfile /> },    
        { path: '404', element: <NotFound /> },     
        { path: '*', element: <Navigate to="/" /> }      
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
