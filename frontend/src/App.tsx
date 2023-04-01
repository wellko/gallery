import React from 'react';
import {CssBaseline, Typography} from "@mui/material";
import AppToolbar from "./components/UI/AppToolBar/AppToolBar";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/UsersSlice";
import {Route, Routes} from "react-router-dom";
import Login from "./features/users/Login";
import Register from "./features/users/Register";
import PhotosPage from "./features/PhotosPage/PhotosPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PhotoForm from "./features/PhotosPage/components/PhotoForm";


function App() {
	const user = useAppSelector(selectUser);
	return (
		<>
			<CssBaseline/>
			<AppToolbar/>
			<Routes>
				<Route path="*" element={<Typography variant='h1'>Page not found!</Typography>}/>
				<Route path="/" element={<PhotosPage/>}/>
				<Route
					path="/photos/new"
					element={
						<ProtectedRoute isAllowed={Boolean(user)}>
							<PhotoForm/>
						</ProtectedRoute>
					}
				/>
				<Route path="/photos/:id" element={<PhotosPage/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
			</Routes>
		</>
	);
}

export default App;
