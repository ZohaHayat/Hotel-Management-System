import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function SUpdateAccInfo() { 
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    
    let { staff_type, staff_id } = useParams();
    let navigate = useNavigate();
 
    const hire = () => {
        Axios.post("http://localhost:3001/supdateaccinfo",{
        fname: fname,
        lname: lname,
        staff_id: staff_id,
        }).then((response) => {
            if(response.data === "Duplicate Error")
            {
                alert("This email already has an account.");
            }
            else
            {
                alert("Update successful.");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Update Account Information </h2>
            <label>New First Name:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setFirstName(event.target.value);
            }} />
            <label>New Last Name:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setLastName(event.target.value);
            }}
            />
            
            <button
                onClick={(event) => [hire()]}>
                Update
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (SUpdateAccInfo);
