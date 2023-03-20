import { GET_ALL_USERS } from '../api/backendRequests';
import React, { useContext, useEffect, useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import DialogContent from '@mui/material/DialogContent';
import CustomizedSnackbar from '../components/CustomizedSnackbar';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Spinner from '../components/Spinner';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import RegisterForm from './Register';
import { AuthContext } from '../App';
import Row from '../components/Row';
import Box from '@mui/material/Box';
import '../custom.css';
import Addresses from './Addresses';

// Home page - for a logged in user 
const Home = () =>{

	
	// For Table Pagination
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	// Keep update on the state changes
	const { state, dispatch } = useContext(AuthContext);

	// A list that will hold all users
	const [users, setUsers] = useState([]);
	const [addresses, setAddresses] = useState([]);

	// Flag for open/close register dialog when logged in user create a new user
	const [showRegisterDialog, setShowRegisterDialog] = useState(false);
	const [showFindAddressesDialog, setShowFindAddressesDialog] = useState(false);

	const [addedUser, setAddedUser] = useState([]);
	const [updatedUser, setUpdatedUser] = useState([]);

	// Successes alerts
	const [showDeletedAlert, setShowDeletedAlert] = useState(false);
	const [showUpdatedAlert, setShowUpdatedAlert] = useState(false);
	const [showCreatedAlert, setShowCreatedAlert] = useState(false);

	// UseEffect keep the users and addresses list updated

	useEffect(() =>{
		if (state.user) {
			GET_ALL_USERS({},
				(response) =>{
					if (!response.users) {
						throw new Error(response.message);
					}
					setAddresses(response.addresses);
					setUsers(response.users);
				},
				(error) =>{
					console.log(error);
					alert(error.message);
				})
		}
	}, [addedUser, updatedUser, state])


	// Handle with change page
	const handleChangePage = (event, newPage) =>{
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) =>{
		setRowsPerPage(+event.target.value);
		setPage(0);
	};


	function onDeleteUser(id) {
		setUsers(users.filter(user => user.id !== id));
	}

	// Handle dialog open
	const handleClickOpen = () =>{
		setShowRegisterDialog(true);
		setShowFindAddressesDialog(false);
	};

	// Handle dialog close
	const handleClose = () =>{
		setShowRegisterDialog(false);
	};
		// Handle dialog close
		const handleCloseAddresses = () =>{
			setShowFindAddressesDialog(false);
		};

	const navigateToAddresses = () => {
		setShowFindAddressesDialog(true);
	};
	// Rows for showing table - contain users list
	const rows = [...users];
	const addressesList = [...addresses];
	rows.forEach(user =>{
		var address = addressesList.find((address) =>{ return address.userId === user.id });
		if (address != undefined) {
			user.userAddress = address.userAddress;
		}
	});

	// Rows for showing table - contain addresses list
	//const addressesList = [...addresses]

	// If user logged in display users table
	if (state.user) {
		if (users.length === 0 || addresses.length === 0) {
			return <Spinner/>
		}
		// Return users table with option to open dialog for add user as a logged in user
		return (
			<div className='main'>
				<Typography color={"black"} variant="h6" component="div" sx={{ fontSize: 'xx-large', fontWeight: 'bolder' }}>
					{state.newUser ? `Welcome, ${state.user.userName}` : `Welcome back, ${state.user.userName}`}
				</Typography>
				<Box
					m={1}
					//margin
					display="flex"
					justifyContent="flex-end"
					alignItems="flex-end"
				>
					<button type='submit' onClick={handleClickOpen} className="btn btn-dark btn-lg btn-block d-grid ">Add User</button>
					<button type='submit' onClick={navigateToAddresses} className="btn btn-dark btn-lg btn-block d-grid mx-2">Find Addresses</button>
				</Box>
				<Box sx={{ paddingBottom: '10%' }}>
					<Paper sx={{ height: '100%', width: '100%', borderRadius: 6, marginTop: 1, }}>
						<TableContainer sx={{ marginBottom: 1, borderRadius: 7, }}>
							<Table aria-label="collapsible table" stickyHeader style={{ margin: 'auto', borderBottom: "none" }}>
								<TableHead>
									<TableRow sx={{
										"& th": {
											backgroundColor: "#d6d1d1",
											fontSize: "1.3rem",
											fontWeight: "bolder",
											color: "rgba(96, 96, 96)",
										},
									}}>
										<TableCell/>
										<TableCell align="center">Email</TableCell>
										<TableCell align="center">User Name</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => (
											<Row onDeleteUser={onDeleteUser} key={row.email} setShowDeletedAlert={setShowDeletedAlert}
												row={row} setShowUpdatedAlert={setShowUpdatedAlert} setUpdatedUser={setUpdatedUser}/>
										))}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							component="div"
							count={rows.length}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={[5]}
							page={page}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}/>
					</Paper>
				</Box>
				<>
					{showRegisterDialog ?
						<>
							<Dialog open={showRegisterDialog} onClose={handleClose} PaperProps={{
								style: {
									minHeight: 300,
									maxHeight: 400,
									minWidth: 400,
									maxWidth: 400,
								},
							}}>
								<IconButton sx={{ marginLeft: 'auto', marginTop: 1, marginRight: 1, marginBottom: 'auto' }}
									edge="start"
									color="inherit"
									onClick={handleClose}
									aria-label="close"
								>
									<CloseIcon/>
								</IconButton>
								<DialogTitle sx={{ fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center', padding: 1 }}>Add User</DialogTitle>
								<DialogContent>
									<RegisterForm flag={true} setAddedUser={setAddedUser} setShowCreatedAlert={setShowCreatedAlert}
										setShowRegisterDialog={setShowRegisterDialog}/>
								</DialogContent>
							</Dialog>
						</> :
						<> </>
					}
				</>
				<>
					{showFindAddressesDialog ?
						<>
							<Dialog open={showFindAddressesDialog} onClose={handleCloseAddresses} PaperProps={{
								style: {
									minHeight: 300,
									maxHeight: 400,
									minWidth: 400,
									maxWidth: 400,
								},
							}}>
								<IconButton sx={{ marginLeft: 'auto', marginTop: 1, marginRight: 1, marginBottom: 'auto' }}
									edge="start"
									color="inherit"
									onClick={handleCloseAddresses}
									aria-label="close"
								>
									<CloseIcon/>
								</IconButton>
								<DialogTitle sx={{ fontSize: 'xx-large', fontWeight: 'bolder', textAlign: 'center', padding: 1 }}>Find Addresses</DialogTitle>
								<DialogContent>
									<Addresses setShowFindAddressesDialog={setShowFindAddressesDialog}/>
								</DialogContent>
							</Dialog>
						</> :
						<> </>
					}
				</>
				<>
					{showCreatedAlert ?
						<>
							<CustomizedSnackbar message={"User successfully created"} type={"success"}/>
						</> : <>
						</>
					}
				</>
				<>
					{showUpdatedAlert ?
						<>
							<CustomizedSnackbar message={"User successfully updated"} type={"success"}/>
						</> : <>
						</>
					}
				</>
				<>
					{showDeletedAlert ?
						<>
							<CustomizedSnackbar message={"User successfully deleted"} type={"success"}/>
						</> : <>
						</>
					}
				</>
			</div>
		)
	}
	// If user not logged in display welcome page
	return (
		<div className='main'>
				<Typography color={"black"} variant="h6" component="div" sx={{ fontSize: 50, fontWeight: 'bolder', flexGrow: 1 }}>
					Hey there,
				</Typography>
				<Typography color={"black"} variant="h6" component="div" sx={{ fontSize: 40, fontWeight: 'bolder', flexGrow: 1 }}>
					Welcome to my home task :)
				</Typography>
				<Typography color={"black"} variant="h6" component="div" sx={{ fontSize: 40, fontWeight: 'bolder', flexGrow: 1 }}>
					Sign in or register to see more
				</Typography>
		</div>
	)
}

export default (Home);