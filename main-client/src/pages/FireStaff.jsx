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


function FireStaff() {

  return (
    <div>hello fire staff page</div>
  );
    
}



export default FireStaff;
