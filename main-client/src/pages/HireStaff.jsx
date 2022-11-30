import React, { useContext, useState } from "react";
import {
  Link,
  Typography,
  Container,
  Box,
  Avatar,
  TextField,
  Button,
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utilities/localStorage";
import { hire } from "../api/backend";
import AuthContext from "../context/AuthContext";



function HireStaff() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your first name:
      <input 
        type="text" 
        name="firstname" 
        value={inputs.firstname || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter your last name:
      <input 
        type="text" 
        name="lastname" 
        value={inputs.lastname || ""} 
        onChange={handleChange}
      />
      </label>
      <label>Enter the email:
        <input 
          type="text" 
          name="email" 
          value={inputs.email || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Enter password:
        <input 
          type="text" 
          name="password" 
          value={inputs.password || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Enter employee type:
        <input 
          type="text" 
          name="employee" 
          value={inputs.employee || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Enter salary:
        <input 
          type="number" 
          name="salary" 
          value={inputs.salary || ""} 
          onChange={handleChange}
        />
        </label>
        <label>Enter Shift Type:
        <input 
          type="text" 
          name="shift" 
          value={inputs.shift || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )
}



export default HireStaff;
