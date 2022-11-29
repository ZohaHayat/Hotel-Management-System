/**
 * This file introduces the concept of React Hooks using which the state of an application
 * is maintained. React Hooks are used to preserve values between function calls.
 * useState() Hooks
 * -----------------
 * Normally, variables “disappear” when the function exits but state variables are preserved by React.
 * I have passed null as the "initial state" to the useState function since no information is saved
 * during authentication initially.
 * useState returns two values: the current state and a function that updates that value. 
 * useEffect() Hooks
 * -----------------
 * By using this Hook, you tell React that your component needs to do something after render.
 * React simply calls that function in order to bring about changes in the page. In this case, authenticate
 * is that function. We want to set the state 
 */

import React from "react";
import { useState, useEffect } from "react";
import { authenticate } from "../api/backend";

function useAuth() {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    authenticate()
      .then(() => {
        setIsValid(true);
      })
      .catch(() => {
        setIsValid(false);
      });
  });

  return isValid;
}

function AuthRouter({ onValid, onInvalid }) {
  const isValid = useAuth();

  if (isValid === false) {
    return onInvalid;
  }

  if (isValid) {
    return onValid;
  }

  return <div>Loading...</div>;
}

export default AuthRouter;
