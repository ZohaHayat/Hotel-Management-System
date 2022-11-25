import React from 'react'
import axios from "axios";
import { useEffect,useState } from "react";

function Home() {
    const [listOfCustomers,setListOfCustomers] = useState([]);
    useEffect( () =>{
        axios.get("http://localhost:3001/posts").then((response)=>{
        setListOfCustomers(response.data);
        // console.log(response.data);

        })

    },[])
    
    return (
        <div className="Customers"> {listOfCustomers.map((value,key)=>{
        return <div className='user'>
            <div className='FirstName'> First Name: {value.FirstName}</div>
            <div className='LastName'> Last Name: {value.LastName}</div>
            <div className='email'> Email: {value.Email}</div>
        </div>

        })}</div>
        
        // <div><h1>DB hotel</h1></div>

    );
    
}

export default Home