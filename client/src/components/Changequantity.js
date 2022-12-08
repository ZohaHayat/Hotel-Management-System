import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function ChangeQuantity() { 

    const [inventory_item, setinventoryitem] = useState("");
    const [quantity, setquantity] = useState("");
    
    let { staff_type, staff_id } = useParams();
    let navigate = useNavigate();
 
    const change = () => {

        Axios.post("http://localhost:3001/changequantity",{
            inventory_item: inventory_item,
            quantity: quantity
        }).then((response) => {
            if(response.data === "Not found Error")
            {
                alert("This item was not found.");
            }
            else
            {
                console.log("success");
                alert("Item updated.");
                navigate("/updateinventory/" + staff_type + "/" + staff_id);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Update Hotel Inventory </h2>
            <label>Inventory Item:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setinventoryitem(event.target.value);
            }}/>
            <label>New Quantity:</label>
            <input 
                type="number"
                onChange={(event) => {
                    setquantity(event.target.value);
            }}/>
            <button
                onClick={(event) => [change()]}>
                Update
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/updateinventory/" + staff_type + "/" + staff_id)]}>
                Back
            </button>
        </div>
        
    );
}

export default (ChangeQuantity);
