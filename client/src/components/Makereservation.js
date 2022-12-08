import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function MakeReservation() { 
    const [room_type, setroomtype] = useState("");
    const [checkindate, setcheckin] = useState("");
    const [checkoutdate, setcheckout] = useState("");

    
    let navigate = useNavigate();

    let { custid} = useParams();
 
    const reserve = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        date = year + "-" + month + "-" + day;


        Axios.post("http://localhost:3001/makereservations",{
        room_type: room_type,
        checkindate: checkindate,
        checkoutdate: checkoutdate,
        date: date,
        custid: custid
        }).then((response) => {
            if(response.data === "No room found")
            {
                alert("No such rooms exists.");
            }
            if(response.data === "All such rooms are booked")
            {
                alert("All such rooms are booked.");
            }
            else
            {
                console.log("success");
                alert("Booking has been made. Your booking ID is: " + (Number(response.data[0].id) + 1));
                navigate("/homepage/" + custid);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Make Reservation </h2>
            <label>Enter Room Type:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setroomtype(event.target.value);
            }}/>
            <label>Enter check in date (format: YYYY-MM-DD):</label>
                <input 
                type="text"
                onChange={(event) => {
                    setcheckin(event.target.value);
            }}
            />
            <label>Enter check out date (format: YYYY-MM-DD):</label>
                <input 
                type="text"
                onChange={(event) => {
                    setcheckout(event.target.value);
            }}
            />  
            <button
                onClick={(event) => [reserve()]}>
                Make Reservation
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back
            </button>
        </div>
        
    );
}

export default (MakeReservation);
