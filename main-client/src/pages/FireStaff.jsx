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
import { fire } from "../api/backend";
import AuthContext from "../context/AuthContext";


function FireStaff({onSubmit}) {
  const [email, setEmail] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onSubmit(email);

  // };


  return (
    <form onSubmit={onSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address of staff you want to fire"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      
    </form>
  )
}


export default FireStaff;
