import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function AddFacility() { 

    const [name, setname] = useState("");
    const [rate, setrate] = useState("");
    
    let { staff_type, staff_id } = useParams();
    let navigate = useNavigate();
 
    const add = () => {
        Axios.post("http://localhost:3001/addfacility",{
        name:name,
        rate: rate
        }).then((response) => {
            if(response.data === "Facility already exists.")
            {
                alert("Facility already exists.");
            }
            else
            {
                console.log("success");
                alert("Facility has been added.");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Add Hotel Facility </h2>
            <label>Enter facility name:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setname(event.target.value);
            }}/>
            <label>Enter facility rate:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setrate(event.target.value);
            }}
            />
            <button
                onClick={(event) => [add()]}>
                Add
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (AddFacility);
