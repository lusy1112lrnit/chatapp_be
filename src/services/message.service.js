import createHttpError from "http-errors";
import { ConversationModel, MessageModel } from "../models/index.js";


export const createMessage = async(data) => {
    let newMessage = await MessageModel.create(data);
    if(!newMessage) throw createHttpError.BadRequest("Oops...Something went wrong!");

    return newMessage;
};

export const populateMessage = async(id) => {
    let msg = await MessageModel.findById(id).populate({
        path: "sender",
        select: "name picture",
        model: "UserModel",
    })
    .populate({
        path: "conversation",
        select: "name picture isGroup users",
        model: "ConversationModel",
        populate:{
            path: "users",
            select: "name email picture status",
            model: "UserModel",
        }
    });
    if(!msg) throw createHttpError.BadRequest("Oops...Something went wrong!");
    return msg;
};


export const getConvoMessages = async(convo_id) =>{
    const messages = await MessageModel.find({conversation: convo_id})
    .populate("sender","name picture email status")
    .populate("conversation")
    if(!messages) throw createHttpError.BadRequest("Oops...Something went wrong!");

    return messages;
};

export const updateConvoMessages = async (convoId, isRead) => {
    try {
      const filter = { conversation: convoId };
      const update = { isRead: isRead };
      const result = await MessageModel.updateMany(filter, update);
      return result;
    } catch (error) {
      throw new Error("Oops... Something went wrong!");
    }
  };

  export const getConvo = async (convoId) => {
    let conversations;
    await ConversationModel.findOne({ _id: convoId })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "name email picture status",
      },
    })
    .then((result) => {
      if (!result) {
        throw createHttpError.NotFound("Conversation not found!");
      }
      conversations = result;
    })
    .catch((err) => {
      throw createHttpError.BadRequest("Oops... Something went wrong!");
    });
  
  return conversations;
  
  };