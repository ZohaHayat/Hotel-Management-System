import {React,useState} from 'react'
import ReactDOM from 'react-dom/client';
import axios from "axios";


//value={listOfInputs.FirstName} onChange={(e) => setInputs(e.target.value)}

function SignUp() {
    const [listOfInputs, setInputs] = useState("");

    const hanndleSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:3001/posts",data).then((response)=>{
        console.log("New account made!");
    })};
    
    return (<div class="signupPage" >
        <form class="formContainer" onSubmit={hanndleSubmit} >
                
                <label>First name: </label>
                <input className="inputSignup" name="FirstName" placeholder="Eg..John"/>
                
                <label>Last name: </label>
                <input className="inputSignup" name="LastName" placeholder="E.g..Appleseed"/>
                
                <label>Email: </label>
                <input className="inputSignup" name="Email" type="email" placeholder="Eg..john@apple.com"/>
                
                <label>Password: </label>
                <input className="inputSignup" name="Password" type="password" placeholder='******'/>
                
                <button type="submit"> Create my account!</button>
            
        </form>

        
    </div>);

};


   
export default SignUp;