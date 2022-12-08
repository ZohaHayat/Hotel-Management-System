import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function StaffCancelReservation() { 
    const [bookingid, setBookingid] = useState("");
    
    let navigate = useNavigate();

    let { staff_type, staff_id} = useParams();
 
    const cancel = () => {


        Axios.post("http://localhost:3001/staffcancelreservations",{
        bookingid:bookingid
        }).then((response) => {
            if(response.data === "No booking found")
            {
                alert("No such booking exists");
            }
            else
            {
                console.log("success");
                alert("Booking has been cancelled.");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Cancel Reservation </h2>
            <label>Enter Booking ID:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setBookingid(event.target.value);
            }}/>
     
            <button
                onClick={(event) => [cancel()]}>
                Cancel Reservation
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back
            </button>
        </div>
        
    );
}

export default (StaffCancelReservation);
