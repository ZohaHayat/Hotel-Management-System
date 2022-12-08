import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function UpdatePass() { 
    const [password, setpass] = useState("");
    
    let { custid } = useParams();
    let navigate = useNavigate();
 
    const updates = () => {
        Axios.post("http://localhost:3001/cupdatepass",{
        password:password,
        custid:custid
        }).then((response) => {
            alert("Update successful.");
            navigate("/homepage/" + custid);
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
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (UpdatePass);
