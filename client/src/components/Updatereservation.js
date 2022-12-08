import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function UpdateReservation() { 
    const [checkin, setcheckin] = useState("");
    const [checkout, setcheckout] = useState("");
    const [bookingid, setbookingid] = useState("");
    

    let { custid } = useParams();
    let navigate = useNavigate();
 
    const updates = () => {
        Axios.post("http://localhost:3001/updatereservation",{
        checkin:checkin,
        checkout:checkout,
        bookingid: bookingid,
        custid: custid
        }).then((response) => {
            if(response.data === "No booking found")
            {
                alert("No booking found");
            }
            else
            {
                alert("Update successful.");
                navigate("/homepage/" + custid);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Update Reservation </h2>
            <label>Enter Booking ID:</label>
            <input 
                type="number"
                onChange={(event) => {
                    setbookingid(event.target.value);
            }} />
            <label>New check in date:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setcheckin(event.target.value);
            }} />

            <label>New check out date:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setcheckout(event.target.value);
            }} />
            
            <button
                onClick={(event) => [updates()]}>
                Update
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (UpdateReservation);
