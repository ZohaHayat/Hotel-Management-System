import React from 'react'
import { useNavigate, useParams } from "react-router-dom";

function UpdateInventory(){ 
  let navigate = useNavigate();
  let {staff_type, staff_id} = useParams();

  const AddItem = () => {
    if (staff_type === "Manager" || staff_type === "Owner")
    {
      return(
        navigate("/additem/"+staff_type + "/" + staff_id)
      )
    }
    else
    {
      return(
        alert("Unauthorized Action! Request Failed")
      )
    }
  };

  const RemoveItem = () => {
    if(staff_type === "Manager" || staff_type === "Owner")
    {
      return(
        navigate("/removeitem/" + staff_type + "/" + staff_id)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed")
      )
      
    }
  };

  const ChangeQuantity = () => {
    if(staff_type === "Manager" || staff_type === "Owner")
    {
      return(
        navigate("/changequantity/" + staff_type + "/" + staff_id)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed")
      )
      
    }
  };

  return (
        <div>
         <h2 id="panel"> Update Hotel Inventory </h2>
            <button
                onClick={(event) => [AddItem()]}>
                Add Inventory
            </button>     

             <button
              onClick={(event) => [RemoveItem()]}>
              Remove Inventory
            </button>       
        
            <button
              onClick={(event) => [ChangeQuantity()]}>
              Change Quantity
            </button>

            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>

        </div>

    )
}

export default (UpdateInventory);