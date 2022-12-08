import React from 'react'
import Axios from "axios";
import { useState} from "react";
import { useNavigate ,useParams} from "react-router-dom";

function SignIn() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    
    let navigate = useNavigate();
    let {staff_type, staff_id, custid} = useParams();

    const logIn = () => {
        Axios.post("http://localhost:3001/signin", {
        email: email,
        password: password,
        }).then((response) => {
            staff_type = response.data[0].employee_type;
            staff_id = response.data[0].StaffID;

            if(response.data === "User does not exist")
            {
                alert("Failed! Account not recognised. Please sign up or check sign in details.");
            }
            else if (response.data[0].CustomerID != null)
            {
                custid = response.data[0].CustomerID;
                alert("Customer Logged In succesfully");
                navigate("/homepage/" + custid);
            }
            else
            {
                alert("Staff Logged In succesfully");
                navigate("/staffhomepage/" + staff_type + "/" + staff_id);
            }
        });
    };

    return (
        <div>
         <h2 id="panel"> Sign In </h2>
            <label>Email:</label>
            <input 
                type="text"
                onChange={(event) => {
                setemail(event.target.value);
            }}/>
            <label>Password:</label>
                <input 
                type="password"
                onChange={(event) => {
                setPassword(event.target.value);
            }}
            />
            <button
                onClick={(event) => [logIn()]}>
                Log In
            </button>
            <button id='panel_button'
                onClick={(event) => [navigate("/")]}>
                Back
            </button>
        </div>
    )
}



export default SignIn;
