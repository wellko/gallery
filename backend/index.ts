import mongoose from "mongoose";
import cors = require("cors");
import usersRouter from "./routers/users";
import config from "./config";
import express = require("express");
import photoRouter from "./routers/photos";

const app = express();
app.use(express.static("public"));
app.use(cors());
const port = 8000;
app.use(express.json());
app.use("/users", usersRouter);
app.use("/photos", photoRouter);
const run = async () => {
	mongoose.set("strictQuery", false);
	await mongoose.connect(config.db);
	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
	process.on("exit", () => {
		mongoose.disconnect();
	});
};

run().catch(console.error);