import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { loginAsync,
         logout,
         selectLogged,
         aboutAsync,
         contactAsync,

         } from './loginSlice';


const Login = () => {
    const logged = useAppSelector(selectLogged);

    const dispatch = useAppDispatch();
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

  return (
    <div style={{backgroundColor: 'red'}}>
        <h5>Login</h5>
        <input placeholder='username' onChange={(e) => setusername(e.target.value)}/>
        <input placeholder='password' onChange={(e) => setpassword(e.target.value)}/>


        {logged ? <button onClick={() => dispatch(dispatch(logout()))}>Logout</button> :
          <button onClick={() => dispatch(loginAsync({username: username, password: password})) }>Login</button>  
        }
        
        <br/>
        <button onClick={() => dispatch(aboutAsync())}>ABOUT - permission</button>
        <button onClick={() => dispatch(contactAsync())}>contact - no permission required</button>

    </div>
  )
}

export default Login