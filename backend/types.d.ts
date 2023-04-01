import {Types} from "mongoose";

export interface IUser {
	email: string;
	password: string;
	token: string;
	role: string;
	displayName: string;
	googleID?: string;
	avatar: string;
}

export interface Ingredient {
	name: string;
	amount: string;
}

export interface CocktailData {
	author: Types.ObjectId;
	name: string;
	image: string;
	receipt: string;
	isPublished: boolean;
	ingredients: Ingredient[];
}