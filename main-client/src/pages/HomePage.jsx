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
import { home } from "../api/backend";
import AuthContext from "../context/AuthContext";



function HomePage() {
    const navigate = useNavigate();

//   const [isError, setError] = useState(false);
//   const navigate = useNavigate();
//   const { setAuthenticated } = useContext(AuthContext);

//   const signIn = (email, password) => {
//     home(email, password)
//       .then((res) => {
//         const {
//           data: { token },
//         } = res;
//         setToken(token);
//         setAuthenticated(true);
//         navigate("/", { replace: true });
//       })
//       .catch(() => {
//         setError(true);
//       });
//   };

    
  
  return (
    <div>
        <Link href="/StaffPage">  
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ navigate("/StaffPage") }
                >
                Staff
                </Button>
        </Link>

        <Link href="/MakeBooking">  
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ navigate("/MakeBooking") }
                >
                Make Booking
                </Button>
        </Link>

        <Link href="/CancelBooking">  
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ navigate("/CancelBooking") }
                >
                Cancel Booking
                </Button>
        </Link>

        <Link href="/EditProfile">  
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ navigate("/EditProfile") }
                >
                Edit Profile
                </Button>
        </Link>

        {/* <Link href="/UpdateInv">   */}
        <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        // onClick={ navigate("/UpdateInv") }
        >
        Update Password
        </Button>
        {/* </Link> */}

        
    </div>
    
  );
    
}



export default HomePage;
