import React, { useState } from 'react'
import './CSS/LoginSignup.scss'

const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    contact: ""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login function executed", formData);

    let responseData;
    await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("Signup function executed", formData);
    let responseData;
    await fetch('http://localhost:4000/api/users/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.errors)
    }
  }
  
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h2>{state}</h2>
        <div className='loginsignup-fields'>
          {state === "Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          {state === "Sign Up"?<input name='contact' value={formData.contact} onChange={changeHandler} type="text" placeholder='Contact Number' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='password' />

        </div>
        <div onClick={() => {state === "Login" ? login():signup()}} className='button'>Continue</div>
        {state === "Sign Up"?<p className='loginsignup-login'>
          Already have an account? <span style={{cursor: 'pointer'}} onClick={() => {setState("Login")}}>Login here</span>
        </p>:<p className='loginsignup-login'>
          Create an account? <span style={{cursor: 'pointer'}} onClick={() => {setState("Sign Up")}}>Click here</span>
        </p>}
        <div className='loginsignup-agree'>
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup