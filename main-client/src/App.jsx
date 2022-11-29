import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import AuthRouter from "./routers/AuthRouter";

// as soon as the react app starts naviagte to the login page
const toLogin = <Navigate to="/login" />;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={<AuthRouter onValid={<Outlet />} onInvalid={toLogin} />}
        ></Route>
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
