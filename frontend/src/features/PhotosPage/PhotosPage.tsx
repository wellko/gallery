import React, {useCallback, useEffect, useState} from 'react';
import {Button, CircularProgress, Container, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import PhotoCard from "./components/PhotoCard";
import {selectStateOfPhoto, selectStatusOfPhoto} from "./PhotoPageSlice";
import {getPhotos, getPhotosByAuthor} from "./PhotoPageThunks";
import {useNavigate, useParams} from "react-router-dom";
import DialogItem from "../../components/Dialog/DialogItem";
import {selectUser} from "../users/UsersSlice";

const PhotosPage = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const photo = useAppSelector(selectStateOfPhoto);
	const loading = useAppSelector(selectStatusOfPhoto);
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState('');

	const handleClickOpen = (url: string) => {
		setSelectedValue(url);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	}

	const callBack = useCallback(async () => {
		if (id?.length) {
			await dispatch(getPhotosByAuthor(id));
		} else {
			await dispatch(getPhotos());
		}
	}, [dispatch, id]);

	useEffect(() => {
		callBack();
	}, [callBack]);

	return (
		<Container fixed>
			<DialogItem open={open} onClose={handleClose} url={selectedValue}/>
			{photo.length ? <>
					<Typography textAlign="center" variant="h2">
						{id ? photo[0].author.displayName + "'s Gallery" : "Gallery"}
					</Typography>
					{id === user?._id && <Button sx={{marginBottom: '20px'}} color='success' variant='contained' onClick={() => {
						navigate('/photos/new');
					}}>Add new photo</Button>}
					<Grid container gap={2}>
						{loading ? <CircularProgress/> : photo.map((el) => <PhotoCard onDialog={handleClickOpen}
																					  key={Math.random()}
																					  photo={el}/>)}
					</Grid>
				</> :
				<Typography textAlign="center" variant="h2">There is no Photos yet</Typography>
			}
		</Container>
	);
};

export default PhotosPage;