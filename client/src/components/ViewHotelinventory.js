import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function ViewInventory() {

    const [inventorylist, setinventorylist] = useState([]);

    const[emptyTable, setEmptyTable]  = useState(false);

    let { staff_type, staff_id } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3001/viewinventory").then((response) => {
            setinventorylist(response.data);
            if(response.data.length === 0)
            {
                setEmptyTable(true);
            }
        });
    }, [] ) ;

    if(emptyTable)
    {             
        return(
            <div className="emptyBackButton">
              <h2>No item Present </h2>
              <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
              </button>
            </div>
        );
    }
    
    return (
        <div>
         <h2 id="panel"> View Hotel Inventory </h2>
            {inventorylist.map((val, key) => { 
                return (
                    <div className="View">
                        <h3>Inventory Item: {val.inventory_item}</h3>
                        <h3>Category: {val.category}</h3>
                        <h3>Quantity: {val.quantity}</h3>
                    </div>)
            })}
            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>);
}

export default ViewInventory;
