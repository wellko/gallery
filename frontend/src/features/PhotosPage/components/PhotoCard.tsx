import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {apiUrl} from '../../../constants';
import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/UsersSlice';
import {Photo} from "../../../types";
import {selectStatusOfDeletingPhoto} from "../PhotoPageSlice";
import {deletePhoto, getPhotos} from "../PhotoPageThunks";

interface state {
	photo: Photo;
}

const CocktailCard: React.FC<state> = ({photo}) => {
	const user = useAppSelector(selectUser);
	const deleting = useAppSelector(selectStatusOfDeletingPhoto);
	const dispatch = useAppDispatch();
	let ImgUrl;
	if (photo.image) {
		ImgUrl = apiUrl + photo.image;
	}
	const navigate = useNavigate();

	const onDelete = async () => {
		await dispatch(deletePhoto(photo._id));
		await dispatch(getPhotos());
	};

	const onClickNavigate = () => {
		navigate('/photos/' + photo._id);
	};

	return (
		<Card sx={{maxWidth: 345}}>
			<CardMedia component="img" height="200" image={ImgUrl} alt="photo"/>
			<CardContent>
				<Typography gutterBottom variant="h4" component="div">
					 {photo.title}
				</Typography>
				<CardActionArea onClick={onClickNavigate}>
					<Typography gutterBottom variant="h5" component="div">
						created by : {photo.author}
					</Typography>
				</CardActionArea>
				{user?.role === 'admin' ? (
					<LoadingButton variant="contained" onClick={onDelete} loading={deleting}>
						Delete
					</LoadingButton>
				) : (
					''
				)}
			</CardContent>
		</Card>
	);
};

export default CocktailCard;