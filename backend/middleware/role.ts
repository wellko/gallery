import {NextFunction, Request, Response} from "express";
import {HydratedDocument} from "mongoose";
import {IUser} from "../types";
import User from "../models/User";

export interface RequestWithUser extends Request {
	user: HydratedDocument<IUser>;
}

const role = async (expressReq: Request, res: Response, next: NextFunction) => {
	const req = expressReq as RequestWithUser;
	const token = await req.get("Authorization");
	const user = await User.findOne({token});
	if (user) {
		req.user = user;
	}
	next();
};

export default role;