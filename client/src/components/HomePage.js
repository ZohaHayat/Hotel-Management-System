import React from 'react'
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function HomePage(){ 
  let navigate = useNavigate();
  const [option, setoption] = useState("");
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

const search = () => {
  if(option === "Make Payment")
  {
    return(
      navigate("/makepayments/" + custid)
    )
  }
  else if (option === "View list of available rooms")
  {
    return(
      navigate("/viewavailrooms/" + custid)
    )
  }
  else if (option === "Make Reservation")
  {
    return(
      navigate("/makereservation/" + custid)
    )
  }
  else if (option === "Cancel Reservation")
  {
    return(
      navigate("/cancelreservation/" + custid)
    )
  }
  else if (option === "Update Account information")
  {
    return(
      navigate("/cupdateaccinfo/" + custid)
    )
  }
  else if (option === "Update Password")
  {
    return(
      navigate("/cupdatepassword/" + custid)
    )
  }
  else if( option === "Avail Facility")
  {
    return(
      navigate("/availfacility/" + custid)
    )
  }
  else if( option === "View Facility")
  {
    return(
      navigate("/viewfacility/" + custid)
    )
  }
  else if (option ==="Update Reservation")
  {
    return(
      navigate("/updatereservation/" + custid)
    )
  }
  else if(option === "View Booking IDs")
  {
    return(
      navigate("/viewbookingid/" + custid)
    )
  }
};

  return (
        <div>
         <h2 id="panel"> Customer Homepage </h2>

         <label></label>
                <input 
                type="text"
                placeholder="Search here..."
                onChange={(event) => {
                    setoption(event.target.value);
            }}
            /> 
            <button id='panel_search'
                onClick={(event) => [search()]}>
                Search
            </button>
            
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