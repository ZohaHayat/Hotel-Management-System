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
import { staffpage } from "../api/backend";
import AuthContext from "../context/AuthContext";



function StaffPage() {
    const navigate = useNavigate();
  
  return (
    <div>
        <Link href="/HireStaff">  
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ navigate("/HireStaff") }
                >
                Hire Staff
                </Button>
        </Link>

        <Link href="/FireStaff">  
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ navigate("/FireStaff") }
                >
                Fire Staff
                </Button>
        </Link>

        <Link href="/ViewInv">  
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ navigate("/ViewInv") }
                >
                View Hotel Inventory
                </Button>
        </Link>

        <Link href="/UpdateInv">  
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ navigate("/UpdateInv") }
                >
                Update Hotel Inventory
                </Button>
        </Link>
    </div>
    
  );
    
}



export default StaffPage;
