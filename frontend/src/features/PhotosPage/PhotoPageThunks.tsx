import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axios-api';
import {Photo, PhotoMutation} from "../../types";

export const getPhotos = createAsyncThunk<Photo[]>('Photos/getAll', async () => {
	try {
		const response = await axiosApi.get('/photos');
		return response.data;
	} catch (e) {
		return e;
	}
});

export const getPhotosByAuthor = createAsyncThunk<Photo[], string>('Photos/getByAuthor', async (arg) => {
	try {
		const response = await axiosApi.get('/photos?user=' + arg);
		return response.data;
	} catch (e) {
		return e;
	}
});

export const createPhoto = createAsyncThunk<Photo, PhotoMutation>(
	'Photos/new',
	async (arg) => {
		try {
			const formData = new FormData();
			const keys = Object.keys(arg) as (keyof PhotoMutation)[];
			keys.forEach((key) => {
					const value = arg[key];
					if (value !== null){
						formData.append(key, value);
					}
				}
			)
			;
			const response = await axiosApi.post('/photos', formData);
			return response.data;
		} catch
			(e) {
			return e;
		}
	})
;


export const deletePhoto = createAsyncThunk<Photo, string>('/photos/delete', async (arg) => {
	try {
		const response = await axiosApi.delete('/photos/' + arg);
		return response.data;
	} catch (e) {
		return e;
	}
});