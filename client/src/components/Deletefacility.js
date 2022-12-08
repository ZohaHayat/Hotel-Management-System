import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function DeleteFacility() { 
    const [name, setfacilityname] = useState("");
    
    let navigate = useNavigate();
    let { staff_type, staff_id } = useParams();
 
    const delfacility = () => {
        Axios.post("http://localhost:3001/deletefacility", {
        name:name
        }).then((response) => {
            if (response.data === "Facility does not exist")
            {
                alert("Facility does not exist");
            }
            else
            {
                alert("Facility has been deleted");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
        });  
    };
    return (
        <div>
         <h2 id="panel"> Delete a Facility </h2>
            <label>Enter facility name: </label>
                <input 
                type="text"
                placeholder="Type here..."
                onChange={(event) => {
                    setfacilityname(event.target.value);
            }}
            /> 
           
            <button
                onClick={(event) => [delfacility()]}>
                Delete
            </button>   
            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (DeleteFacility);
