
import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Photo from "./models/Photo";

const run = async () => {
	mongoose.set("strictQuery", false);
	await mongoose.connect(config.db);
	const db = mongoose.connection;
	try {
		await db.dropCollection("users");
		await db.dropCollection("photos");
	} catch (e) {
		console.log("Collections were not present, skipping drop...");
	}
	const [user1, user2, user3] = await User.create(
		{
			email: "admin@gmail.com",
			password: "admin",
			displayName: "admin",
			avatar: "images/admin.png",
			role: "admin",
			token: "admin",
		},
		{
			email: "user@gmail.com",
			password: "user",
			displayName: "traveler",
			avatar: "images/user.jpg",
			role: "user",
			token: "user1",
		},
		{
			email: "user2@gmail.com",
			password: "user",
			displayName: "eater",
			avatar: "images/user.jpg",
			role: "user",
			token: "user2",
		},

	);

	await Photo.create(
		{
			title: "Amsterdam",
			author: user2._id,
			image: "images/amsterdam.jpg",
		},
		{
			title: "Canada",
			author: user2._id,
			image: "images/canada.jpg",
		},
		{
			title: "Denver",
			author: user2._id,
			image: "images/denver.jpg",
		},
		{
			title: "Dubai",
			author: user2._id,
			image: "images/dubai.jpg",
		},
		{
			title: "Weekend",
			author: user1._id,
			image: "images/bar.jpg",
		},
		{
			title: "fresh Lemonade",
			author: user1._id,
			image: "images/lemonade.jpg",
		},
		{
			title: "sushi",
			author: user3._id,
			image: "images/sushi.jpg",
		},{
			title: "Tempura",
			author: user3._id,
			image: "images/tempura.jpg",
		},
		{
			title: "Steak",
			author: user3._id,
			image: "images/steak.jpg",
		},
	);
	await db.close();
};

run().catch(console.error);