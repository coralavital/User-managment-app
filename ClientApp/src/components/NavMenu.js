import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LOGOUT_USER } from '../api/backendRequests';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { AuthContext } from '../App';



export default function Nav() {

	const { state, dispatch } = useContext(AuthContext);
	// Log out function
	function logout() {
		LOGOUT_USER({},
			(response) =>{
				if (!response) {
					throw new Error(response.message);
				}
				dispatch({
					type: "LOGOUT",
					payload: {}
				});
			},
			(error) =>{
				console.log(error);
				alert(error);
			})
	}

	let menu;
	if (!state.user) {
		menu = (
			<>
			<Typography color={"secondary"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Button sx={{
							color: {
								"&:hover": {
									color: "#90caf9"
								}
							}
						}} component={Link} to='/' underline="none">Home</Button>
					</Typography>
				<Button sx={{
							color: {
								"&:hover": {
									color: "#90caf9"
								}
							}
						}} component={Link} to='/login' underline="none">Sign In</Button>
			</>
		)
	} else {
		menu = (
			<Button sx={{
				color: {
					"&:hover": {
						color: "#90caf9"
					}
				},
				marginLeft: "auto"
			}} component={Link} to='/' onClick={logout} underline="none">Logout</Button>
		)
	}
	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar position="sticky" style={{  boxShadow: 'none'}}>
				<Toolbar>
					{menu}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

const darkTheme = createTheme({
	palette: {
		mode: 'dark',

	},
});