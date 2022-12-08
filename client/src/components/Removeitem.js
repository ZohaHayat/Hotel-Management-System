import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function RemoveItem() { 
    const [inventory_item, setinventoryitem] = useState("");
    
    let { staff_type, staff_id } = useParams();
    let navigate = useNavigate();
 
    const remove = () => {

        Axios.post("http://localhost:3001/removeitem",{
            inventory_item: inventory_item
        }).then((response) => {
            if(response.data === "Not found Error")
            {
                alert("This item was not found.");
            }
            else
            {
                console.log("success");
                alert("Item removed.");
                navigate("/updateinventory/" + staff_type + "/" + staff_id);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Remove Inventory Item</h2>
            <label>Inventory Item:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setinventoryitem(event.target.value);
            }}/>
            <button
                onClick={(event) => [remove()]}>
                Remove Item
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/updateinventory/" + staff_type + "/" + staff_id)]}>
                Back
            </button>
        </div>
        
    );
}

export default (RemoveItem);
