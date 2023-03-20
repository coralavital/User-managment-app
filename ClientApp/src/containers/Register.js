import CustomizedSnackbar from '../components/CustomizedSnackbar';
import { REGISTER_USER } from '../api/backendRequests';
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { AuthContext } from '../App';

// Register page
const RegisterForm = (props) =>{

	const [redirect, setRedirect] = useState(false);
	const { state, dispatch } = useContext(AuthContext);
	const [showCreateErrorAlert, setShowCreateErrorAlert] = useState(false);

	const { setShowRegisterDialog, setAddedUser, setShowCreatedAlert } = props;

	// Initial Form Data
	const initialFormData = Object.freeze({
		email: "",
		username: "",
		password: "",
		userAddress: ""
	});

	// Form fields
	const [formData, setFormData] = useState(initialFormData);

	// Handle change form data
	const handleChange = (e) =>{
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setShowCreateErrorAlert(false);
	};

	const handleCloseCreateErrorAlert = () =>{
		setShowCreateErrorAlert(false);
	};

	// Handle submit - POST request
	function handleSubmit(e) {
		e.preventDefault();

		const userToCreate = {
			email: formData.email,
			username: formData.username,
			password: formData.password,
			userAddress: formData.userAddress
		};

		REGISTER_USER({ userToCreate },
			(response) =>{
				if (!response.user) {
					throw new Error(response.message);
				}

				if (setShowRegisterDialog) {
					setShowRegisterDialog(false);
					setShowCreatedAlert(true);
					setAddedUser(userToCreate)
				}
				else {
					dispatch({
						type: "REGISTER",
						payload: { ...response }
					});
				}

				// Navigate to the home page as a logged in user
				setRedirect(true);
			},
			(error) =>{
				setShowCreateErrorAlert(true);
			})
	};

	// The user registered and transfer to the home page
	if (redirect) {
		return <Navigate to={"/"}/>
	}

	return (
		<>
			{props.flag === true ?
				<>
					{/* If some user register other user in add user dialog */}
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<label>Email</label>
							<input type='email' name='email'
								className='form-control' placeholder='Please enter email'
								pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
								onChange={handleChange} required maxLength={25}/>
						</div>
						<div className='mb-3'>
							<label>User Name</label>
							<input type='text' name="username" className='form-control' placeholder='Please enter username'
								onChange={handleChange} required maxLength={25}/>
						</div>

						<div className='mb-3'>
							<label>Password</label>
							<input type='password' name='password' className='form-control' placeholder='Please enter password'
								onChange={handleChange} required minLength={6} maxLength={25}/>
						</div>
						<div className='mb-3'>
							<label>Address</label>
							<input type='text' name='userAddress' className='form-control' placeholder='Please enter address'
								onChange={handleChange} required maxLength={25}/>
						</div>
						<div className="col-md-12 text-center">
							<button type='submit' onClick={handleCloseCreateErrorAlert} className="btn btn-dark btn-lg  btn-lg btn-block d-grid mb-1 mx-auto">Add</button>
						</div>
					</form>
				</> :
				<>
					{/* If user register himself at the first time */}
					<div className='border'>
						<div className='center'>
							<form onSubmit={handleSubmit}>
								<h3 className='signup-title'>Sign Up</h3>
								<div className='mb-3'>
									<label>Email</label>
									<input type='email' name='email' className='form-control' placeholder='Please enter email'
										pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
										onChange={handleChange} required maxLength={25}/>
								</div>
								<div className='mb-3'>
									<label>User Name</label>
									<input type='text' name="username" className='form-control' placeholder='Please enter username'
										onChange={handleChange} required maxLength={25}/>
								</div>
								<div className='mb-3'>
									<label>Password</label>
									<input type='password' name='password' className='form-control' placeholder='Please enter password'
										onChange={handleChange} required minLength={6} maxLength={25}/>
								</div>
								<div className='mb-3'>
									<label>Address</label>
									<input type='text' name='userAddress' className='form-control' placeholder='Please enter address'
										onChange={handleChange} required maxLength={25}/>
								</div>
								<div className='d-grid mx-5 mb-2'>
									<button type='submit' onClick={handleCloseCreateErrorAlert} className="btn btn-dark btn-lg mx-1 my-1 ">Sign Up</button>
								</div>
								<p className='already-registered mx-auto text-left'>
									Have an account ?
									<Button component={Link} to='/login' border='none' sx={{
										border: 'none',
										color: {
											"&:hover": {
												color: "#90caf9"
											}
										}
									}} underline="none">Sign In</Button>
								</p>
							</form>
						</div>
					</div>
				</>
			}
			<>
				{showCreateErrorAlert ?
					<>
						<CustomizedSnackbar message={"The email or username already exist"} type={"error"}/>
					</> : <>
					</>
				}
			</>
		</>
	);
}

export default RegisterForm;