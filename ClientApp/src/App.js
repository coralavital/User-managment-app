import React, { createContext, useEffect, useReducer, useState } from 'react';
import { CURRENT_USER } from './api/backendRequests.js';
import { reducer } from "./store/reducer/app-reducer";
import { Route, Routes } from 'react-router-dom';
import Constants from './utilities/Constants';
import { Layout } from './components/Layout';
import AppRoutes from './AppRoutes';
import './custom.css';

export const AuthContext = createContext();

const styles = {
	fontFamily: '"Segoe UI"',
	TextDecoder: 'none'
};

export default function App() {
	// Application state
	const [state, dispatch] = useReducer(reducer, {
		user: undefined,
	});
	const [isAuthenticating, setIsAuthenticating] = useState(true);
	const active_user_url = Constants.API_URL_GET_CURRENT_USER;

	const headers = {
		'Authorization': localStorage.getItem("Authorization"),
		'Content-Type': 'application/json'
	}

	useEffect(() =>{
		CURRENT_USER({ headers },
			(response) =>{
				if (!response.user) {
					throw new Error(response.message);
				}
				setIsAuthenticating(false);
				dispatch({
					type: "GET_ACTIVE_USER",
					payload: { ...response }
				})
			},
			(error) =>{
				localStorage.removeItem("Authorization");
				setIsAuthenticating(false);
			}
		)
	}, [])

	return (
		!isAuthenticating && (
			<div style={styles}>
				<AuthContext.Provider
					value={{
						state,
						dispatch
					}}>
					<Layout>
						<Routes>
							{AppRoutes.map((route, index) =>{
								const { element, ...rest } = route;
								return <Route key={index} {...rest} element={element}/>;
							})}
						</Routes>
					</Layout>
				</AuthContext.Provider>
			</div>

		)
	);
}