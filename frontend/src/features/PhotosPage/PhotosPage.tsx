import React, {useCallback, useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import PhotoCard from "./components/PhotoCard";
import {selectStateOfPhoto, selectStatusOfPhoto} from "./PhotoPageSlice";
import {getPhotos, getPhotosByAuthor} from "./PhotoPageThunks";
import {useParams} from "react-router-dom";

const PhotosPage = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const photo = useAppSelector(selectStateOfPhoto);
	const loading = useAppSelector(selectStatusOfPhoto);

	const callBack = useCallback(async () => {
		if(id){
			await dispatch(getPhotosByAuthor(id));
		}else {
			await dispatch(getPhotos());
		}
	}, [dispatch, id]);

	useEffect(() => {
		callBack();
	}, [callBack]);

	return (
		<Container fixed>
			{photo.length ? <>
					<Typography textAlign="center" variant="h2">
						{id? photo[0].author.displayName + "'s Gallery" : "Gallery" }
					</Typography>
					<Grid container gap={2}>
						{loading ? <CircularProgress/> : photo.map((el) => <PhotoCard key={Math.random()}
																							photo={el}/>)}
					</Grid>
				</> :
				<Typography textAlign="center" variant="h2">There is no Photos yet</Typography>
			}
		</Container>
	);
};

export default PhotosPage;