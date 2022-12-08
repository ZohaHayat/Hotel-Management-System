import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ViewBookingID() {

    const [idlist, setidlist] = useState([]);

    const[emptyTable, setEmptyTable]  = useState(false);

    let { custid } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3001/viewbookingid", {params:{custid:custid}}).then((response) => {
            setidlist(response.data);
            if(response.data.length === 0)
            {
                setEmptyTable(true);
            }
        });
    }) ;

    if(emptyTable)
    {             
        return(
            <div className="emptyBackButton">
              <h2>No item Present </h2>
              <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
              </button>
            </div>
        );
    }
    
    return (
        <div>
         <h2 id="panel"> View Booking IDs </h2>
            {idlist.map((val, key) => { 
                return (
                    <div className="View">
                        <h3>Booking ID: {val.bookingID}</h3>
                        <h3>Check in date: {val.check_in_date}</h3>
                        <h3>Check out date: {val.check_out_date}</h3>
                    </div>)
            })}
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
            </button>
        </div>);
}

export default ViewBookingID;
