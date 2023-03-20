import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import DialogContentText from '@mui/material/DialogContentText';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DELETE_USER } from '../api/backendRequests';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import UpdateForm from '../containers/UpdateUser';
import CloseIcon from '@mui/icons-material/Close';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import { AuthContext } from '../App';
import Box from '@mui/material/Box';
import '../custom.css';


// For every user create a row with the user details
const Row = (props) =>{
	const { row, onDeleteUser, setShowDeletedAlert, setShowUpdatedAlert, setUpdatedUser } = props;
	const [open, setOpen] = useState(false);
	const [showUpdateDialog, setShowUpdateDialog] = useState(false);
	const { state, dispatch } = useContext(AuthContext);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	// Handle dialog open
	const handleUpdateOpen = () =>{
		setShowUpdateDialog(true);
	};

	// Handle dialog close
	const handleUpdateClose = () =>{
		setShowUpdateDialog(false);
	};

	const handleDeleteOpen = () =>{
		setShowDeleteDialog(true);
	};
	// Handle dialog close
	const handleDeleteClose = () =>{
		setShowDeleteDialog(false);
	};

	// Delete user function - DELETE request
	function handleDelete() {
		DELETE_USER({ row },
			(response) =>{
				if (!response.message) {
					throw new Error(response);
				}
				onDeleteUser(row.id);
				if (row.id === state.user.id) {
					dispatch({
						type: "LOGOUT",
						payload: {}
					});
					setShowDeletedAlert(true);
				}
			},
			(error) =>{
				console.log(error);
				alert(error);
			})
	}

	// Return user row with option to open dialog for update user as a logged in user
	return (
		<React.Fragment>
			<TableRow role="checkbox" tabIndex={-1} key={row.code} sx={{
				'& > *': { borderBottom: 'unset' },
				"& td": {
					fontSize: "1.3rem",
					fontFamily: '"Segoe UI"'
				}
			}}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}>
						{open ? <ArrowCircleUpOutlinedIcon sx={{ color: 'black' }}/> : <ArrowCircleDownOutlinedIcon/>}
					</IconButton>
				</TableCell>
				<TableCell align="center">{row.email}</TableCell>
				<TableCell align="center">{row.userName}</TableCell>
			</TableRow>
			<TableRow sx={{
				"& th": {
					fontSize: "1.2rem",
					fontWeight: "bolder",
					fontFamily: '"Segoe UI"'
				},
			}}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0, }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 4, borderRadius: 2, backgroundColor: "#d6d1d1", }}>
							<Typography gutterBottom component="div" sx={{
								fontSize: 'h5.fontSize', fontWeight: 'bolder',
								textAlign: 'center', paddingTop: 2,
								fontFamily: '"Segoe UI"'
							}}>
								User Details
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Email</TableCell>
										<TableCell>User Name</TableCell>
										<TableCell>Address</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow sx={{
										"& td": {
											fontSize: "1.1rem",
											fontFamily: '"Segoe UI"'
										}}}>
										<TableCell>{row.email}</TableCell>
										<TableCell>{row.userName}</TableCell>
										<TableCell>{row.userAddress}</TableCell>
										<TableCell align='right'>
											<Tooltip title="Update user details">
												<IconButton>
													<BorderColorIcon onClick={handleUpdateOpen}/>
												</IconButton>
											</Tooltip>
											<Tooltip title="Delete user">
												<IconButton>
													<DeleteIcon onClick={handleDeleteOpen}/>
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<>
				{/* Dialog for Add user as a logged in user */}
				{showUpdateDialog ?
					<>
						<Dialog open={showUpdateDialog} onClose={handleUpdateClose} PaperProps={{
							style: {
								minHeight: 300,
								minWidth: 400,
								fontFamily: '"Segoe UI"',
							}}}>
							<IconButton sx={{ marginLeft: 'auto', marginTop: 1, }}
								edge="start"
								color="inherit"
								onClick={() => setShowUpdateDialog(false)}
								aria-label="close"
							>
								<CloseIcon/>
							</IconButton>
							<DialogTitle sx={{ fontFamily: '"Segoe UI"', fontSize: 'xx-large', fontWeight: 'bolder', padding: 1, textAlign: 'center' }}>Update User Details</DialogTitle>
							<DialogContent>
								<UpdateForm setUpdatedUser={setUpdatedUser} setShowUpdatedAlert={setShowUpdatedAlert} setShowUpdateDialog={setShowUpdateDialog} user={row}/>
							</DialogContent>
						</Dialog>
					</> : <> </>
				}
			</>
			<>
				{/* Dialog for Add user as a logged in user */}
				{showDeleteDialog ?
					<>
						<Dialog open={showDeleteDialog} onClose={handleDeleteClose} PaperProps={{
							style: {
								minHeight: 100,
								minWidth: 100,
							},
						}}>
							<IconButton sx={{ marginLeft: 'auto', marginTop: 1, marginRight: 1, marginBottom: 'auto' }}
								edge="start"
								color="inherit"
								onClick={handleDeleteClose}
								aria-label="close"
							>
								<CloseIcon/>
							</IconButton>
							<DialogTitle sx={{ fontFamily: '"Segoe UI"', fontSize: 'xx-large', fontWeight: 'bolder', padding: 1, textAlign: 'center' }}>Delete User</DialogTitle>
							<DialogContent>
								<DialogContent>
									<DialogContentText id="alert-dialog-slide-description">
										<>
											{state.user.id !== row.id ?
												<>
													<Typography sx={{ fontSize: 16, textAlign: 'center'}}>
														Are you sure that you want to delete the user?
													</Typography>
												</> : <>
													<Typography sx={{ fontSize: 16, textAlign: 'center'}}>
														Are you sure you want to delete your user?
													</Typography>
													<Typography sx={{ fontSize: 16, textAlign: 'center'}}>
														After deletion, you will be logged out automatically
													</Typography>
												</>
											}
										</>
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<div className="col-md-7 text-center">
										<button onClick={handleDelete} className="btn btn-dark btn-lg btn-block d-grid ">Delete</button>
									</div>
								</DialogActions>
							</DialogContent>
						</Dialog>
					</> : <> </>
				}
			</>
		</React.Fragment>
	);
}

export default Row;