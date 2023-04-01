import mongoose, { Types } from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;
const PhotoSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => User.findById(value),
			message: "User not found!",
		},
	},
});

const Photo = mongoose.model("Photo", PhotoSchema);

export default Photo;