import createHttpError from "http-errors";
import { searchUsers as searchUsersService} from "../services/user.service.js";
import logger from "../configs/logger.config.js";

export const seachUsers = async(req,res,next)=>{
    try {
        const keyword = req.query.search;
        if(!keyword){
            logger.error("please add a search query first");
            throw createHttpError.BadRequest("Oops...Something went wrong!");
        }
        const users = await searchUsersService(keyword, req.user.userId);
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }
}