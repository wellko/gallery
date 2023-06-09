import express from "express";
import { imagesUpload } from "../multer";
import auth, { RequestWithUser } from "../middleware/auth";
import { promises as fs } from "fs";
import Photo from "../models/Photo";
import role from "../middleware/role";

const photoRouter = express.Router();

photoRouter.post("/", auth, imagesUpload.single("image"), async (req, res) => {
	const user = (req as RequestWithUser).user;
	try {
		const photo = await Photo.create({
			title: req.body.title,
			image: req.file ? req.file.filename : null,
			author: user._id,
		});
		return res.send(photo);
	} catch (error) {
		if (req.file) {
			await fs.unlink(req.file.path);
		}
		return res.status(400).send(error);
	}
});

photoRouter.get("/", async (req, res) => {
	try {
		const queryUser = req.query.user as string;
		if (queryUser) {
			const photos = await Photo.find({ author: queryUser}).populate("author", "displayName")
			return res.send(photos);
		} else {
			const photos = await Photo.find().populate("author", "displayName")
			return res.send(photos);
		}
	} catch {
		return res.sendStatus(500);
	}
});

photoRouter.delete("/:id", role, async (req, res) => {
	const user = (req as RequestWithUser).user;
	try {
		if (user.role === "admin") {
			const deleted = await Photo.deleteOne({ _id: req.params.id });
			if (deleted.deletedCount === 1) {
				return res.send({ message: "deleted" });
			} else {
				return res.send({ message: "cant find photo" });
			}
		}
		const deleted = await Photo.deleteOne({
			_id: req.params.id,
			author: user._id,
		});
		if (deleted.deletedCount === 1) {
			return res.send({ message: "deleted" });
		} else {
			return res.send({ message: "no permission" });
		}
	} catch {
		return res.sendStatus(500);
	}
});

export default photoRouter;