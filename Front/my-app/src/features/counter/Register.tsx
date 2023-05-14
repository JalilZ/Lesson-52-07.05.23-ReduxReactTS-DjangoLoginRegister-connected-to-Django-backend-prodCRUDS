import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { 
         registerAsync,
         } from './RegisterSlice';


const Register = () => {

    const dispatch = useAppDispatch();
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

  return (
    <div>
        Register
        <input placeholder='username' onChange={(e) => setusername(e.target.value)}/>
        <input placeholder='email' onChange={(e) => setemail(e.target.value)}/>
        <input placeholder='password' onChange={(e) => setpassword(e.target.value)}/>


        
        <button onClick={() => dispatch(registerAsync({username: username, email: email, password: password})) }>register</button>
        
        
        <br/>
        

    </div>
  )
}

export default Register