import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function DeleteRoom() { 
    const [room_number, setroomnumber] = useState("");
    
    let navigate = useNavigate();
    let { staff_type, staff_id } = useParams();

    const delroom = () => {

        Axios.post("http://localhost:3001/deleteroom", {
        room_number:room_number,
        }).then((response) => {
            if (response.data === "This room number does not exist")
            {
                alert("This room number does not exist");
            }
            else if (response.data === "This room is booked.")
            {
                alert("This room is booked.")
            }
            else
            {
                alert("The room has been deleted");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
            
        });  
    };


    return (
        <div>
         <h2 id="panel"> Delete a Room </h2>
            <label>Enter Room Number to delete: </label>
                <input 
                type="number"
                placeholder="Type here..."
                onChange={(event) => {
                    setroomnumber(event.target.value);
            }}
            /> 
           
            <button
                onClick={(event) => [delroom()]}>
                Delete Room
            </button>   
            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (DeleteRoom);
