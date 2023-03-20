import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props}/>;
});

export default function CustomizedSnackbar(props) {
	const [open, setOpen] = useState(true);
	const { message, type } = props;


	const handleClose = (event, reason) =>{
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};



	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} sx={{marginTop: 3}} anchorOrigin={{vertical: 'top',
		horizontal: 'center'}}>
			<Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);

}
