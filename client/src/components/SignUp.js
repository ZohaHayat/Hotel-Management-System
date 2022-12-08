import React from 'react'
import Axios from "axios";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

function SignUp() {
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const addUsers = () => {
        Axios.post("http://localhost:3001/register",{
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        }).then((response) => {
            if(response.data === "Duplicate Error")
            {
                alert("This email already has an account.");
            }
            else
            {
                console.log("success");
                alert("Sign up successful. You can now Log In.");
                navigate("/signin");
            }
        });
    };

    return (
        <div className="SignUp">
         <h2 id="panel"> Sign Up </h2>
            <label>First Name:</label>
            <input 
                type="text"
                onChange={(event) => {
                setfname(event.target.value);
            }}/>
            <label>Last Name:</label>
            <input 
                type="text"
                onChange={(event) => {
                setlname(event.target.value);
            }}/>
            <label>Email:</label>
                <input 
                type="text"
                onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <label>Password:</label>
                <input 
                type="password"
                onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            <button
                onClick={(event) => [addUsers()]}>
                Join
            </button>
            <button id='panel_button'
                onClick={(event) => [navigate("/")]}>
                Back
            </button>
        </div>
    );
}


export default SignUp;
