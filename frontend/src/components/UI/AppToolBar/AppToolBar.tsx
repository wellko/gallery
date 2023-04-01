import React from 'react';
import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link as NavLink} from 'react-router-dom';
import {useAppSelector} from '../../../app/hooks';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import {selectUser} from '../../../features/users/UsersSlice';

const Link = styled(NavLink)({
	color: 'inherit',
	textDecoration: 'none',
	'&:hover': {
		color: 'inherit',
	},
});

const AppToolbar = () => {
	const user = useAppSelector(selectUser);
	return (
		<AppBar position="sticky" sx={{mb: 2}}>
			<Toolbar>
				<Grid container justifyContent="space-between" alignItems="center">
					<Typography variant="h6" component="div">
						<Link to="/">Gallery</Link>
					</Typography>
					<Grid item xs={3} container>{user ? <UserMenu user={user}/> : <AnonymousMenu/>}</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default AppToolbar;