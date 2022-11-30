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
import { updateinv } from "../api/backend";
import AuthContext from "../context/AuthContext";


function UpdateInv() {

  return (
    <div>hello update hotel inventory page</div>
  );
    
}



export default UpdateInv;
