import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ViewFacility() {

    const [facilitylist, setfacilitylist] = useState([]);

    const[emptyTable, setEmptyTable]  = useState(false);

    let { custid } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3001/viewfacilities").then((response) => {
            setfacilitylist(response.data);
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
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
              </button>
            </div>
        );
    }
    
    return (
        <div>
         <h2 id="panel"> View Hotel Facility </h2>
            {facilitylist.map((val, key) => { 
                return (
                    <div className="View">
                        <h3>Facility ID: {val.facilityID}</h3>
                        <h3>Name of Facility: {val.name_of_facility}</h3>
                        <h3>Facility Rate: {val.facility_rate}</h3>
                    </div>)
            })}
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
            </button>
        </div>);
}

export default ViewFacility;
