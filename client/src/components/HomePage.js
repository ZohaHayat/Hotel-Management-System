import React from 'react'
import { useNavigate, useParams } from "react-router-dom";

function HomePage(){ 
  let navigate = useNavigate();
  let { custid} = useParams();

  const viewrooms = () => {
    return(
      navigate("/viewavailrooms/" + custid)
    )
  };

  const makereservation = () => {
    return(
      navigate("/makereservation/" + custid)
    )
  };

  const cancelreservation = () => {
    return(
      navigate("/cancelreservation/" + custid)
    )
  };

  const updatereservation = () => {
    return(
      navigate("/updatereservation/" + custid)
    )
  };

  
  const makepayments = () => {
    return(
      navigate("/makepayments/" + custid)
    )
  };

  const updateaccinfo = () => {
    return(
      navigate("/cupdateaccinfo/" + custid)
    )
  };

  const updatepassword = () => {
    return(
      navigate("/cupdatepassword/" + custid)
    )
  };

  const avail = () => {
    return(
      navigate("/availfacility/" + custid)
    )
  };

  const viewfacility = () => {
    return(
      navigate("/viewfacility/" + custid)
    )
  };

  const viewbookingids = () => {
    return(
      navigate("/viewbookingid/" + custid)
    )
  };

  const logOut = () => {
    alert("Logged Out succesfully");
    navigate("/signin");
};

  return (
        <div>
         <h2 id="panel"> Customer Homepage </h2>
            <button
                onClick={(event) => [viewrooms()]}>
                View list of available rooms
            </button>     

             <button
              onClick={(event) => [makereservation()]}>
              Make Reservation
            </button>       
        
            <button
              onClick={(event) => [cancelreservation()]}>
              Cancel Reservation
            </button>

            <button
              onClick={(event) => [makepayments()]}>
              Make Payments
            </button>

            <button
              onClick={(event) => [updateaccinfo()]}>
              Update Account information
            </button>

            <button
              onClick={(event) => [updatepassword()]}>
              Update Password
            </button>

            <button
              onClick={(event) => [avail()]}>
              Avail Facility
            </button>

            <button
              onClick={(event) => [viewfacility()]}>
              View Facility
            </button>

            <button
              onClick={(event) => [updatereservation()]}>
              Update Reservation
            </button>

            <button
              onClick={(event) => [viewbookingids()]}>
              View Booking IDs
            </button>

            <button
               onClick={(event) => [logOut()]}>
               Log Out
            </button>

        </div>

    )
}

export default (HomePage);