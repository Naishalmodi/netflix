import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png';
import {login,signup} from '../../firebase';
import netflix_spiner from '../../assets/netflix_spinner.gif';

const Login = () => {

  const[signState,setSignState] = useState("Sign In");
  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [loding,setLoding] = useState(false);

  const user_auth = async(event) =>{
    event.preventDefault();
    setLoding(true);
    if(signState === "Sign In")
    {
      await login(email, password);
    }
    else
    {
      await signup(name, email, password);
    }
    setLoding(false);
  }

  return (
    loding?<div className='login-spiner'>
        <img src={netflix_spiner} alt=''/>
    </div>:
    <div className='login'>
      <img src={logo} alt='' className='login-logo'/>
      <div className='login-form'>
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up"?
          <input value={name} onChange={(e)=>{setName(e.target.value)}} type='text' placeholder="your Name"/>:<></>}
          
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type='text' placeholder="your Email"/>

          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder="Password"/>

          <button onClick={user_auth} type='submit'>{signState}</button>

          <div className='form-help'>
            <div className='remember'>
                <input type='checkbox'/>
                <label htmlFor=''>Remember me</label>
            </div> 
            <p>Need Help?</p>   
          </div>
        </form>
        <div className='form-switch'>
          {signState === "Sign In"?<p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>:
          <p>Alraedy have an account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>}
          
          
        </div>
      </div>
    </div>
  )
}

export default Login