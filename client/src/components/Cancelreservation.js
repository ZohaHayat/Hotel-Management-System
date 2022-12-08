import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function CancelReservation() { 
    const [bookingid, setroomtype] = useState("");
    
    let navigate = useNavigate();

    let { custid} = useParams();
 
    const cancel = () => {


        Axios.post("http://localhost:3001/cancelreservations",{
        bookingid:bookingid,
        custid: custid
        }).then((response) => {

            if(response.data === "No booking found")
            {
                alert("No such booking exists");
            }
            else
            {
                console.log("success");
                alert("Booking has been cancelled.");
                navigate("/homepage/" + custid);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Cancel Reservation</h2>
            <label>Enter Booking ID:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setroomtype(event.target.value);
            }}/>
     
            <button
                onClick={(event) => [cancel()]}>
                Cancel Reservation
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back
            </button>
        </div>
        
    );
}

export default (CancelReservation);
