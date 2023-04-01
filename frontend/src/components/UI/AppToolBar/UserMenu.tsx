import React, {useState} from 'react';
import {User} from '../../../types';
import {Avatar, Button, Grid, Menu, MenuItem} from '@mui/material';
import {useAppDispatch} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {logoutAction} from '../../../features/users/UsersThunks';
import {apiUrl} from '../../../constants';

interface Props {
	user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const imageUrl = apiUrl + user.avatar;
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Grid item xs={2}>
				<Avatar alt="avatar" src={ imageUrl }
						sx={{width: 50, height: 50, display: 'inline-block'}}/>
			</Grid>
			<Grid item container xs={10}>
				<Button sx={{paddingBottom: '10px', marginY: "auto"}} onClick={handleClick} color="inherit">
					Hello, {user.displayName}
				</Button>
			</Grid>

			<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem
					onClick={() => {
						navigate('/photos/myGallery');
					}}
				>
					My gallery
				</MenuItem>
				<MenuItem
					onClick={() => {
						navigate('/photos/new');
					}}
				>
					Add Photo
				</MenuItem>
				<MenuItem
					onClick={async () => {
						await dispatch(logoutAction());
						navigate('/');
					}}
				>
					Log Out
				</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;