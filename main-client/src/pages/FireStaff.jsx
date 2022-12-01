import React, { useState } from "react";
import {
  Link,
  Typography,
  Container,
  Box,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";

import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { fire } from "../api/backend";

function AuthForm({onSubmit, error, children }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(email);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <Typography component="h1" variant="h5">
          Fire Staff
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={error}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          {children}
        </Box>
      </Box>
    </Container>
  );
}

function FireStaff() {
  const [isError, setError] = useState(false);

  const fire = (email) => {
    fire(email)
      .then(() => {
        
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;

        console.log(message);
        setError(true);
      });
  };

  return (
    <AuthForm onSubmit={fire} error={isError}>
      
    </AuthForm>
  );
}

export default FireStaff;
