import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function HireStaff() { 
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [employee_type, settype] = useState("");
    const [salary, setsalary] = useState("");
    const [shift, setshift] = useState("");
    
    let { staff_type, staff_id } = useParams();
    let navigate = useNavigate();
 
    const hire = () => {
        Axios.post("http://localhost:3001/hiringstaff",{
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        employee_type: employee_type,
        salary: salary,
        shift: shift
        }).then((response) => {
            if(response.data === "Duplicate Error")
            {
                alert("This email has already been hired.");
            }
            else
            {
                console.log("success");
                alert("Hiring successful.");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
        });
    };

    return (
        <div>
         <h2 id="panel"> Hire Staff </h2>
            <label>First Name:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setFirstName(event.target.value);
            }}/>
            <label>Last Name:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setLastName(event.target.value);
            }}
            />
            <label>Email:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setemail(event.target.value);
            }}
            />
            <label>Password:</label>
                <input 
                type="password"
                onChange={(event) => {
                    setpassword(event.target.value);
            }}
            />
            <label>Employee Type:</label>
            <input 
                type="text"
                onChange={(event) => {
                    settype(event.target.value);
            }}/>
            <label>Salary:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setsalary(event.target.value);
            }}/>
            <label>Shift Type (am/pm):</label>
            <input 
                type="text"
                onChange={(event) => {
                    setshift(event.target.value);
            }}/>
            <button
                onClick={(event) => [hire()]}>
                Hire Staff
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/staffhomepage/" + staff_type + "/" + staff_id)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (HireStaff);
