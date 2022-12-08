import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ViewStaff() {

    const [stafflist, setstafflist] = useState([]);

    const[emptyTable, setEmptyTable]  = useState(false);

    let { staff_type, staff_id } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3001/viewstaff").then((response) => {
            setstafflist(response.data);
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
              <h2>No Staff Present </h2>
              <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
              </button>
            </div>
        );
    }
    
    return (
        <div>
         <h2 id="panel"> Staff Panel </h2>
            {stafflist.map((val, key) => { 
                return (
                    <div className="Viewstaff">
                        <h3>Staff ID: {val.staffID}</h3>
                        <h3>Name: {val.first_name + " " + val.last_name}</h3>
                        <h3>Employee Type: {val.employee_type}</h3>
                        <h3>Salary: {val.salary}</h3>
                        <h3>Shift Type: {val.shift_type}</h3>
                    </div>)
            })}
            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>);
}

export default ViewStaff;
