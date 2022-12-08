import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function UpdatePassword() { 
    const [password, setpass] = useState("");
    
    let { staff_type, staff_id } = useParams();
    let navigate = useNavigate();
 
    const updates = () => {
        Axios.post("http://localhost:3001/supdatepass",{
        password:password,
        staff_id:staff_id
        }).then((response) => {
            alert("Update successful.");
            navigate("/staffhomepage/" + staff_type + "/" + staff_id);
        });
    };

    return (
        <div>
         <h2 id="panel"> Update Password </h2>
            <label>New Password:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setpass(event.target.value);
            }} />
            
            <button
                onClick={(event) => [updates()]}>
                Update
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (UpdatePassword);
