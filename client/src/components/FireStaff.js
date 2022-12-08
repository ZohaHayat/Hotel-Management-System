import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function FireStaff() { 
    const [email, setemail] = useState("");
    
    let navigate = useNavigate();
    let { staff_type, staff_id } = useParams();
    const fire = () => {
        Axios.post("http://localhost:3001/firingstaff", {
        email:email
        }).then((response) => {
            if (response.data === "Staff not found")
            {
                alert("Staff member not found");
            }
            else
            {
                alert("Staff member has been fired");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
        });  
    };


    return (
        <div>
         <h2 id="panel"> Fire Staff </h2>
            <label>Remove by Email: </label>
                <input 
                type="text"
                placeholder="Type here..."
                onChange={(event) => {
                    setemail(event.target.value);
            }}
            /> 
           
            <button
                onClick={(event) => [fire()]}>
                Fire Staff
            </button>   
            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (FireStaff);
