import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function AddItem() { 
    const [inventory_item, setinventoryitem] = useState("");
    const [category, setcategory] = useState("");
    const [quantity, setquantity] = useState("");
    
    let { staff_type, staff_id } = useParams(); 
    let navigate = useNavigate();
 
    const add = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        date = year + "-" + month + "-" + day;


        Axios.post("http://localhost:3001/additem",{
        inventory_item: inventory_item,
        category: category,
        quantity: quantity,
        staff_id: staff_id,
        date: date
        }).then((response) => {

            if(response.data === "Duplicate Error")
            {
                alert("This item has already been added, only the quantity can be changed.");
            }
            else
            {
                console.log("success");
                alert("Item added.");
                navigate("/updateinventory/" + staff_type + "/" + staff_id);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Add Inventory Item</h2>
            <label>Inventory Item:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setinventoryitem(event.target.value);
            }}/>
            <label>Category:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setcategory(event.target.value);
            }}
            />
            <label>Quantity:</label>
                <input 
                type="number"
                onChange={(event) => {
                    setquantity(event.target.value);
            }}
            />  
            <button
                onClick={(event) => [add()]}>
                Add Item
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/updateinventory/" + staff_type + "/" + staff_id)]}>
                Back
            </button>
        </div>
        
    );
}

export default (AddItem);
