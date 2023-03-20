import { UPDATE_USER } from '../api/backendRequests';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';

const UpdateUser = (props) =>{

	const { state, dispatch } = useContext(AuthContext);
	const { user, setShowUpdatedAlert, setShowUpdateDialog, setUpdatedUser } = props;

	// Initial Form Data
	const initialFormData = Object.freeze({
		userName: "",
		email: "",
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
	};

	const handleUpdateAlert = () =>{
		setShowUpdatedAlert(false);
	};

	// Handle submit - PUT request
	function handleSubmit(e) {
		e.preventDefault();
		const userToUpdate = {
			id: user.id,
			userName: formData.userName ? formData.userName : user.userName,
			email: user.email,
			userAddress: formData.userAddress ? formData.userAddress : user.userAddress
		};

		UPDATE_USER( { userToUpdate },
			(response) =>{
				if (!response) {
					throw new Error(response.message);
				}
				setShowUpdateDialog(false);
				setShowUpdatedAlert(true);
				dispatch({
					type: "UPDATED",
					payload: { ...response }
				});
				if (setUpdatedUser) {
					{ setUpdatedUser(userToUpdate) }
				}
			}, (error) =>{
				console.log(error);
				alert(error);
			})
	};

	return (

		<form onSubmit={handleSubmit}>
			<div className='mb-3'>
				<label>Email</label>
				<input type='email' name='email' className='form-control' disabled value={user.email} onChange={handleChange}/>
			</div>
			<div className='mb-3'>
				<label>User name</label>
				<input type='text' name='userName' maxLength={25} className='form-control' defaultValue={user.userName} onChange={handleChange}/>
			</div>
			<div className='mb-3'>
				<label>Address</label>
				<input type='text' name='userAddress' maxLength={25} className='form-control' defaultValue={user.userAddress} onChange={handleChange}/>
			</div>
			<div className="col-md-12 text-center">
				<button type='submit' onClick={handleUpdateAlert} className="btn btn-dark btn-lg  btn-lg btn-block d-grid mb-2 mx-auto">Update</button>
			</div>
		</form>

	);
}

export default UpdateUser;