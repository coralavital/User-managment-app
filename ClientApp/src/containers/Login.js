import CustomizedSnackbar from '../components/CustomizedSnackbar';
import { LOGIN_USER } from '../api/backendRequests';
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"; 
import { AuthContext } from '../App';

// Login page
const LoginForm = () =>{
	const { state, dispatch } = useContext(AuthContext);
	const [redirect, setRedirect] = useState(false);
	const [showLoginErrorAlert, setShowLoginErrorAlert] = useState(false);

	// Initial Form Data
	const initialFormData = Object.freeze({
		email: "",
		password: ""
	});

	// Form fields
	const [formData, setFormData] = useState(initialFormData);

	// Handle change form data
	const handleChange = (e) =>{
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setShowLoginErrorAlert(false);
	};

	const handleCloseLoginErrorAlert = () =>{
		setShowLoginErrorAlert(false);
	};

	// Handle submit - POST request
	async function handleSubmit(e) {
		e.preventDefault();
		// Automatically Login

		const userToLogin = {
			email: formData.email,
			password: formData.password,
		};

    await new Promise((resolve, reject) =>{
      LOGIN_USER({ userToLogin },
        (response) =>{
          if (!response.user) {
            throw new Error(response);
          }
          console.log(response)
          localStorage.setItem("Authorization", response.token);
          dispatch({
            type: "LOGIN",
            payload: { ...response }
          });
          // Navigate to the home page as a logged in user
          setRedirect(true);
          resolve();
		  return true;
        },
        (error) =>{
          setShowLoginErrorAlert(true);
          reject(error);
        })
    })

	}

	// The user registered and transfer to the home page
	if (redirect) {
		console.log(`User successfully logged in`);
		return <Navigate to={"/"}/>
	}

	return (
		<div className='border'>
			<div className='center'>
				<form onSubmit={handleSubmit}>
					<h3 className='signup-title'>Sign In</h3>
					<div className='mb-3'>
						<label>Email</label>
						<input type='email' name="email" className='form-control' placeholder='Enter Email'
							pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
							onChange={handleChange} required/>
					</div>
					<div className='mb-3'>
						<label>Password</label>
						<input type='password' name='password' className='form-control' placeholder='Enter Password'
							onChange={handleChange} required minLength={6} maxLength={20}/>
					</div>
					<div className='d-grid mx-5'>
						<button type='submit' onClick={handleCloseLoginErrorAlert} className="btn btn-dark btn-lg mx-1 my-1">Sign In</button>
					</div>
				</form>
				<span className='already-registered mx-auto text-right'>
					Not a user ? <Button component={Link} to='/register' border='none' sx={{border: 'none',
							color: {
								"&:hover": {
									color: "#90caf9"
								}
							}
						}}  underline="none">Sign Up</Button>
				</span>
			</div>
			<>
				{showLoginErrorAlert ?
					<>
						<CustomizedSnackbar message={"Incorrect email or password"} type={"error"}/>
					</> : <>
					</>
				}
			</>
		</div>
	);
}

export default LoginForm;