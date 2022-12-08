import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function CUpdateAccInfo() { 
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    
    let { custid } = useParams();
    let navigate = useNavigate();
 
    const hire = () => {
        Axios.post("http://localhost:3001/cupdateaccinfo",{
        fname: fname,
        lname: lname,
        cust_id: custid,
        }).then((response) => {
            if(response.data === "Duplicate Error")
            {
                alert("This email already has an account.");
            }
            else
            {
                alert("Update successful.");
                navigate("/homepage/" + custid);
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
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (CUpdateAccInfo);
