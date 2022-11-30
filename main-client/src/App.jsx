import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import AuthRouter from "./routers/AuthRouter";
import HomePage from "./pages/HomePage";
import HireStaff from "./pages/HireStaff";
import FireStaff from "./pages/FireStaff";
import ViewInv from "./pages/ViewInv";
import UpdateInv from "./pages/UpdateInv";
import StaffPage from "./pages/StaffPage";
import MakeBooking from "./pages/MakeBooking";
import CancelBooking from "./pages/CancelBooking";
import EditProfile from "./pages/EditProfile";


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
        <Route path="HomePage" element={<HomePage />} />
        <Route path="HireStaff" element={<HireStaff />} />
        <Route path="FireStaff" element={<FireStaff />} />
        <Route path="ViewInv" element={<ViewInv />} />
        <Route path="UpdateInv" element={<UpdateInv />} />
        <Route path="StaffPage" element={<StaffPage />} />
        <Route path="MakeBooking" element={<MakeBooking />} />
        <Route path="CancelBooking" element={<CancelBooking />} />
        <Route path="EditProfile" element={<EditProfile />} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;
