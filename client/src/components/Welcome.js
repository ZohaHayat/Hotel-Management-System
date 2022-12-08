import React from 'react'
import { useNavigate } from 'react-router-dom';

function Welcome(){
    let navigate = useNavigate();

    return (
        <div>
         <h1 id="panel"> Hotel Management System </h1>
          <button 
            onClick={() => {
              navigate("/signup");
            }}
          >
            {" "}
            Sign Up
          </button>
          <button 
            onClick={() => {
              navigate("/signin");
            }}
          >
            {" "}
            Sign In
          </button>
          
        </div>
    );
}

export default Welcome;
