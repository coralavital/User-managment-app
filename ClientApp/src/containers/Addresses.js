import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { GET_ADDRESSES } from '../api/backendRequests';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../App';
import '../custom.css';
import CustomizedSnackbar from '../components/CustomizedSnackbar';

// Home page - for a logged in user 
const Addresses = (props) => {

	// A list that will hold all users
	const [addresses, setAddresses] = useState([]);

	const [showAddressesAlert, setShowAddressesAlert] = useState(false);


	const initialFormData = Object.freeze({
		query: ""
	});

	// Form fields
	const [formData, setFormData] = useState(initialFormData);

	// Handle change form data
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setShowAddressesAlert(false);

	};

	const data = formData.query;

	useEffect(() => {
		setAddresses([]);
		if (data) {
			GET_ADDRESSES(data,
				(response) => {
					if (!response.addresses) {
						throw new Error(response.message);
					}
					setAddresses(response.addresses);
					setShowAddressesAlert(false);
				},
				(error) => {
					setShowAddressesAlert(true);
				})
		}
	}, [data])

	return (
		<form >
			<div className='mb-3'>
				<label>Query</label>
				<input type='text' name='query'
					className='form-control' placeholder='Please enter query' required onChange={handleChange} onKeyDownCapture={handleChange}  />
			</div>

			<div className='main'>
				<TableContainer sx={{ marginBottom: 1, borderRadius: 2, }}>
					<Table aria-label="collapsible table" stickyHeader>
						<TableHead>
							<TableRow sx={{
								"& th": {
									backgroundColor: "#d6d1d1",
									fontSize: "1.3rem",
									fontWeight: "bolder",
									color: "rgba(96, 96, 96)",
								},
							}}>
								<TableCell sx={{
									textAlign: "center",
								}}>Addresses</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{addresses.map((address) => (
								<TableRow
									key={address.userAddress}
								>

									<TableCell sx={{
										borderBottom: "1.5px solid black",
										textAlign: "center",
									}}>
										{address.userAddress}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

			</div>
			<>
				{showAddressesAlert ?
					<>
						<CustomizedSnackbar message={"There is no results"} type={"error"} />
					</> : <>
					</>
				}
			</>
		</form>
	)

}

export default (Addresses);