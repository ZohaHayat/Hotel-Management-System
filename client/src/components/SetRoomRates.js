import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function SetRoomRates() { 
    const [newrate, setNewrate] = useState("");
    const [roomtype, setRoomtype] = useState("");
    
    let { staff_type, staff_id } = useParams();
    let navigate = useNavigate();
 
    const set = () => {
        Axios.post("http://localhost:3001/setroomrate",{
        newrate: newrate,
        roomtype: roomtype,
        }).then((response) => {

            if(response.data === "room does not exist")
            {
                alert("This room type does not exist.");
            }
            else
            {
                alert("Room rate has been updated.");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
            
            
        });
    };

    return (
        <div>
         <h2 id="panel"> Set Room Rates </h2>
            <label>Room Type:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setRoomtype(event.target.value);
            }} />

            <label>New Room Rate:</label>
            <input 
                type="number"
                onChange={(event) => {
                    setNewrate(event.target.value);
            }} />
            
            <button
                onClick={(event) => [set()]}>
                Set
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (SetRoomRates);
