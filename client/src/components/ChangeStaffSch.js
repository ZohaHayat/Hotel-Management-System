import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function ChangeStaffSch() { 
    const [sch, setSch] = useState("");
    const [email, setEmail] = useState("");
    
    let { staff_type, staff_id } = useParams();
    let navigate = useNavigate();
 
    const change = () => {

        Axios.post("http://localhost:3001/setstaffsch",{
        sch: sch,
        email, email
        }).then((response) => {
            if(response.data === "Does not exist")
            {
                alert("This email does not exist.");
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
         <h2 id="panel"> Change Staff Schedule </h2>
            <label>Email:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setEmail(event.target.value);
            }}/>

            <label>Set new staff schedule:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setSch(event.target.value);
            }}/>
            
            <button
                onClick={(event) => [change()]}>
                Update
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (ChangeStaffSch);
