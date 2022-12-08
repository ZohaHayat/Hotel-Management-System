import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function MakePayment() { 
    const [payment_amount, setpaymentamount] = useState("");
    const [card, setcard] = useState("");
    const [pass, setpass] = useState("");

    
    let { custid } = useParams();
    let navigate = useNavigate();
 
    const pay = () => {
        Axios.post("http://localhost:3001/makepayment",{
        payment_amount: payment_amount,
        custid: custid
        }).then((response) => {
            if(response.data === "No payments due")
            {
                alert("You have no payments due");
            }
            else 
            {
                console.log("success");
                alert("Payment successful.");
                navigate("/homepage/" + custid);
            }
        });
    };
    return (
        <div>
         <h2 id="panel"> Make Payment </h2>
            <label>Enter the amount to pay:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setpaymentamount(event.target.value);
            }}/>
            <label>Enter credit card number:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setcard(event.target.value);
            }}/>
            <label>Enter credit card password:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setpass(event.target.value);
            }}/>
            <button
                onClick={(event) => [pay()]}>
                Pay
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + custid)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (MakePayment);
