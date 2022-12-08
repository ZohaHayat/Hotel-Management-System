import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function AvailFacility() { 

    const [facilityname, setFacilityname] = useState("");
    const [quantity, setQuantity] = useState("");
    
    let { custid } = useParams();
    let navigate = useNavigate();
    let date = new Date();
 
    const avail = () => {
        Axios.post("http://localhost:3001/availfacility",{
        facility_name : facilityname,
        quantity : quantity,
        custID : custid,
        date:date,
        }).then((response) => {
            if(response.data === "no booking")
            {
                alert("You do not have any bookings.");
            }
            else if(response.data === "facility does not exist")
            {
                alert("Facility does not exist.");
            }
            else
            {
                alert("success.");
                navigate("/homepage/" + custid);
            }
        });
    };

    return (
        <div>
         <h2 id="panel"> Avail Hotel Facility</h2>
            <label>Facility Name:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setFacilityname(event.target.value);
            }}/>

            <label>Quantity:</label>
            <input 
                type="number"
                onChange={(event) => {
                    setQuantity(event.target.value);
            }}/>
            
            <button
                onClick={(event) => [avail()]}>
                Avail Facility
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (AvailFacility);
