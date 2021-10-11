import React, { useState } from 'react'
import { useHistory } from 'react-router'

const Signup = (props) => {
    let history = useHistory();
    const [cred, setCred] = useState({ name: "", email: "", password: "", cpassword: "" })
    const { name, email, password } = cred;
    localStorage.setItem("name", name);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, email: email, password: password })
        })
        const json = await response.json();

        if (json.authtoken) {
            localStorage.setItem('token', json.authtoken)
            history.push("/");
            props.showAlert("Successfully signup", "success")
        }
        else {
            props.showAlert("Invalid Credintail", "danger")
        }

    }
    const onchange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div className="my-0">
            <form onSubmit={handleSubmit}>
                <h1 className="my-2 mx-0">Create an iNotebook account</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" required onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" required onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" required minLength={5} autoComplete="off" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" required minLength={5} autoComplete="off" onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
