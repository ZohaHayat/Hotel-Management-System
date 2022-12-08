import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, useHistory} from 'react-router-dom';

import Welcome from './components/Welcome';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import StaffHomepage from "./components/StaffHomepage";
import HireStaff from "./components/HireStaff";
import FireStaff from "./components/FireStaff";
import ViewInventory from "./components/ViewHotelinventory";
import UpdateInventory from "./components/UpdateHotelinventory";
import AddItem from "./components/Additem";
import RemoveItem from "./components/Removeitem";
import ChangeQuantity from "./components/Changequantity";
import ViewRooms from "./components/viewlistofrooms";
import MakeReservation from "./components/Makereservation";
import CancelReservation from "./components/Cancelreservation";
import SUpdateAccInfo from "./components/SUpdateAccInfo";
import CUpdateAccInfo from "./components/CUpdateAccInfo";
import SetRoomRates from "./components/SetRoomRates";
import MakePayment from "./components/Makepayment";
import DeleteRoom from "./components/Deleteroom";
import ViewStaff from "./components/Viewstaffpanel";
import AddFacility from "./components/Addfacility";
import DeleteFacility from "./components/Deletefacility";
import AvailFacility from "./components/AvailFacility";
import ChangeStaffSch from "./components/ChangeStaffSch";
import StaffReservation from "./components/Staffreservation";
import StaffCancelReservation from "./components/Staffcancelreservation";
import StaffRooms from "./components/Staffrooms";
import Searchbook from "./components/Searchbooking";
import ViewFacility from "./components/Viewfacility";
import UpdatePass from "./components/Cupdatepassword";
import UpdatePassword from "./components/Supdatepassword";
import UpdateReservation from "./components/Updatereservation";
import ViewBookingID from "./components/Viewbookingid";


function App()
{
  return (

  <div className="App">
      <div className="Header">
      </div>
      <div className="body">

    <Router>
      <Routes>

        <Route path="/" element={<Welcome/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />  

        <Route exact path="/homepage/:custid" element={<HomePage/>} />
        <Route exact path="/staffhomepage/:staff_type/:staff_id" element={<StaffHomepage/>} />
        <Route exact path="/hirestaff/:staff_type/:staff_id" element={<HireStaff/>} />
        <Route exact path="/firestaff/:staff_type/:staff_id" element={<FireStaff/>} />
        <Route exact path="/viewinventory/:staff_type/:staff_id" element={<ViewInventory/>} />
        <Route exact path="/updateinventory/:staff_type/:staff_id" element={<UpdateInventory/>} />
        <Route exact path="/additem/:staff_type/:staff_id" element={<AddItem/>} />
        <Route exact path="/removeitem/:staff_type/:staff_id" element={<RemoveItem/>} />
        <Route exact path="/changequantity/:staff_type/:staff_id" element={<ChangeQuantity/>} />
        <Route exact path="/viewavailrooms/:custid" element={<ViewRooms/>} />
        <Route exact path="/makereservation/:custid" element={<MakeReservation/>} />
        <Route exact path="/cancelreservation/:custid" element={<CancelReservation/>} />
        <Route exact path="/supdateaccinfo/:staff_type/:staff_id" element={<SUpdateAccInfo/>} />
        <Route exact path="/cupdateaccinfo/:custid" element={<CUpdateAccInfo/>} />
        <Route exact path="/setroomrates/:staff_type/:staff_id" element={<SetRoomRates/>} />
        <Route exact path="/makepayments/:custid" element={<MakePayment/>} />
        <Route exact path="/deleteroom/:staff_type/:staff_id" element={<DeleteRoom/>} />
        <Route exact path="/viewstaffpanel/:staff_type/:staff_id" element={<ViewStaff/>} />
        <Route exact path="/addfacility/:staff_type/:staff_id" element={<AddFacility/>} />
        <Route exact path="/deletefacility/:staff_type/:staff_id" element={<DeleteFacility/>} />
        <Route exact path="/availfacility/:custid" element={<AvailFacility/>} />
        <Route exact path="/changestaffsch/:staff_type/:staff_id" element={<ChangeStaffSch/>} />
        <Route exact path="/staffreservation/:staff_type/:staff_id" element={<StaffReservation/>} />
        <Route exact path="/staffcancelreservation/:staff_type/:staff_id" element={<StaffCancelReservation/>} />
        <Route exact path="/staffrooms/:staff_type/:staff_id" element={<StaffRooms/>} />
        <Route exact path="/searchbooking/:staff_type/:staff_id" element={<Searchbook/>} />
        <Route exact path="/viewfacility/:custid" element={<ViewFacility/>} />
        <Route exact path="/cupdatepassword/:custid" element={<UpdatePass/>} />
        <Route exact path="/supdatepassword/:staff_type/:staff_id" element={<UpdatePassword/>} />
        <Route exact path="/updatereservation/:custid" element={<UpdateReservation/>} />
        <Route exact path="/viewbookingid/:custid" element={<ViewBookingID/>} />  
      </Routes>
    </Router>
      </div>
     </div> 
  );
}

export default App;
