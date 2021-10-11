import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Login = (props) => {
    let history = useHistory();
    const [cred, setCred] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        })
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token', json.authtoken)
            history.push("/");
            props.showAlert("Successfully logged in","success")
        }
        else{
            props.showAlert("Invalid Credintail","danger")
        }
    }
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <h1 className="my-4">Login to continue</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onchange} value={cred.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"   onChange={onchange} value={cred.password}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
