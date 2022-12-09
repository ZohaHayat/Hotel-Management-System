import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function StaffReservation() { 
    const [email, setemail] = useState("");
    const [room_type, setroomtype] = useState("");
    const [checkindate, setcheckin] = useState("");
    const [checkoutdate, setcheckout] = useState("");

    
    let navigate = useNavigate();

    let { staff_type, staff_id} = useParams();
 
    const reserve = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        date = year + "-" + month + "-" + day;


        Axios.post("http://localhost:3001/staffreservations",{
        email: email,
        room_type: room_type,
        checkindate: checkindate,
        checkoutdate: checkoutdate,
        date: date
        }).then((response) => {
            if(response.data === "No room found")
            {
                alert("No such rooms exists.");
            }
            else if(response.data === "All such rooms are booked")
            {
                alert("All such rooms are booked.");
            }
            else if(response.data === "This customer does not exist")
            {
                alert("This customer does not exist");
            }
            else if(reserve.send === "success")
            {
                console.log("success");
                alert("Booking has been made. The booking ID is: " + "1");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
            else
            {
                console.log("success");
                alert("Booking has been made. The booking ID is: " + (Number(response.data[0].id) + 1));
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Make Reservation </h2>
            <label>Enter Customer Email:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setemail(event.target.value);
            }}/>
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
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back
            </button>
        </div>
        
    );
}

export default (StaffReservation);
