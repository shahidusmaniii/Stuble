import React, { useContext, useState } from 'react'
import "../../../styles/LoginStyle.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AppContext from '../../../context/AppContext.js';

const LoginAdmin = () => {
    const { showAlert, LoginA, user, setUser } = useContext(AppContext);
    const navigate = useNavigate()

    const [Admin, setAdmin] = useState({
        email: "", password: ""
    })

    const Adminlogin = async (e) => {
        e.preventDefault();
        const server = process.env.REACT_APP_SERVER;
        const response = await axios.post(`${server}/LoginAdmin`, {
            email: Admin.email,
            password: Admin.password
        }) 
        if (response.data.success) {
            showAlert(response.data.message, 'success');
            console.log(response.data)
            setUser(response.data.data.name);
            
            // localStorage.setItem("userLogin", JSON.stringify(data.data.data));
            LoginA('true');
            navigate('/AdminHome')
        } else {
            showAlert(response.data.message, 'danger');
        }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;  // Regular expression for password validation (at least 8 characters long)
    // let name, value;
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'email' && !emailRegex.test(value)) {
            showAlert('Please enter a valid email address', 'danger');
        }
        // Password validation
        if (name === 'password' && !passwordRegex.test(value)) {
            showAlert('Password must be at least 8 characters long', 'danger');
        }
        setAdmin({ ...Admin, [name]: value })
        e.preventDefault();
    }

    return (
        <>
            <div className="centerL">
                <h1>Login For Admin</h1>
                <form method="post">
                    <div className="txt_field">
                        <input type="text" required name='email' value={Admin.email} onChange={handleInput} />
                        <label>Admin email</label>
                    </div>
                    <div className="txt_field">
                        <input type="password" required name='password' value={Admin.password} onChange={handleInput} />
                        <label>Password</label>
                    </div>
                    <div className="pass"><a href="Forget" >Forget Password?</a></div>
                    <input type="submit" value="Login" className="Login" onClick={Adminlogin} />
                    <div className="signup_link">
                        Not a member? <a href="SignUpAdmin" >Signup</a>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginAdmin