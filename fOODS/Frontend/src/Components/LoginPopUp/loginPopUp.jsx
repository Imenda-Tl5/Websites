import React, { useState } from 'react'
import "./loginPopUp.css"
const LoginPopUp = ({login,setLogin}) => {
  return (
    <div className='login'>
        <div className="login-container">
            <div className="header">

              <div className="log-in-head">
              <h1>{login==="signUp"?"SIGNUP":"LOGIN"}</h1> <h1 onClick={()=>setLogin(false)} className='close'>X</h1>
              </div>
            </div>
            <div className="">
              <div className="input-fields">
                {login==="signUp"?<input type="text" id="name" placeholder='Your Name'/>:<></>}
                <input type="email" id='email'  placeholder='Your Email'/>
                <input type="password" id='password' placeholder='Password'/>
              </div>
            </div>
            <div className="info">
                <p>{login==="signUp"?"already  have an account":"dont have an account yet"}? Click here to <span onClick={()=>setLogin(prev=>prev==="logIn"?"signUp":"logIn")}>{login==="signUp"? "logIn":"signUp"}</span> </p>
                <button>{login==="signUp"?"create Account":"Login"}</button>   

            </div>
            </div>
    </div>
  )
}

export default LoginPopUp
