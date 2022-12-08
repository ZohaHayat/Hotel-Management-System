import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function StaffRooms() {

    const [roomlist, setroomlist] = useState([]);

    const[emptyTable, setEmptyTable]  = useState(false);

    let navigate = useNavigate();

    let {staff_type, staff_id} = useParams();

    useEffect(() => {
        Axios.get("http://localhost:3001/staffavailablerooms").then((response) => {
            setroomlist(response.data);
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
              <h2>No Rooms available </h2>
              <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
              </button>
            </div>
        );
    }
    
    return (
        <div>
         <h2 id="panel"> View Hotel Rooms </h2>
            {roomlist.map((val, key) => { 
                return (
                    <div className="View">
                        <h3>Room Number: {val.room_number}</h3>
                        <h3>Type of room: {val.type_of_room}</h3>
                    </div>)
            })}
            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>);
}

export default StaffRooms;
