import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function Searchbook() {
    const [booklist, setbooklist] = useState([]);

    const[emptyTable, setEmptyTable]  = useState(false);

    let navigate = useNavigate();

    let {staff_type, staff_id} = useParams();

    useEffect(() => {
      Axios.get("http://localhost:3001/bookings").then((response) => {
          setbooklist(response.data);
          if(response.data.length === 0)
          {
              setEmptyTable(true);
          }
      });
  }, [] ) ;


    if(emptyTable)
    {             
        return(
            <div className="emptyBackButton">
              <h2>No Bookings available </h2>
              <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
              </button>
            </div>
        );
    }
    
    return (
        <div> 
         <h2 id="panel"> Search Bookings </h2>
            {booklist.map((val, key) => { 
                return (
                    <div className="View">
                        <h3>Booking ID: {val.bookingID}</h3>
                        <h3>Customer ID: {val.customerID}</h3>
                        <h3>Check in Date: {val.check_in_date}</h3>
                        <h3>Check out Date: {val.check_out_date}</h3>
                    </div>)
            })}
            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>);
}

export default Searchbook;
