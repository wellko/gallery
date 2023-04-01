import React, {useState} from 'react';
import {Container, Grid, Paper, TextField, Typography} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import {PhotoMutation} from "../../../types";
import {createPhoto} from "../PhotoPageThunks";
import {selectStatusOfPostingPhoto} from "../PhotoPageSlice";

const PhotoForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const loading = useAppSelector(selectStatusOfPostingPhoto);
	const onSubmit = async (photo: PhotoMutation) => {
		try {
			await dispatch(createPhoto(photo)).unwrap();
			navigate('/');
		} catch (e) {
			// error
		}
	};

	const [state, setState] = useState<PhotoMutation>({
		title: '',
		image: null,
	});

	const submitFormHandler = (e: React.FormEvent) => {
		e.preventDefault();
		void onSubmit(state);
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setState((prevState) => {
			return {...prevState, [name]: value};
		});
	};

	const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, files} = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: files && files[0] ? files[0] : null,
		}));
	};

	return (
		<form autoComplete="off" onSubmit={submitFormHandler}>
			<Container fixed>
				<Paper sx={{paddingBottom: '20px'}} elevation={5}>
					<Typography variant='h2' textAlign='center'>Create new Photo</Typography>
					<Grid container direction="row" spacing={2}>
						<Grid container item xs={12}>
							<TextField
								sx={{margin: 'auto', width: '60%'}}
								label="Title"
								name="title"
								value={state.title}
								onChange={inputChangeHandler}
								required
							/>
						</Grid>
						<Grid container item xs={12} justifyContent="center">
							<Grid item xs={6}>
								<FileInput label="Image" onChange={fileInputChangeHandler} name="image" type="image/*"/>
							</Grid>
						</Grid>

						<Grid container item xs={12}>
							<LoadingButton disabled={!state.image} sx={{margin: 'auto'}} loading={loading} type="submit" color="primary"
										   variant="contained">
								Create
							</LoadingButton>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</form>
	);
};

export default PhotoForm;