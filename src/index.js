import app from "./app.js";
import { Server } from "socket.io";
import logger from "./configs/logger.config.js";
import mongoose from "mongoose";
import SocketServer from "./SocketServer.js";



//env variables
const  DATABASE_URL  = process.env.DATABASE_URL;
const PORT = process.env.PORT ;

//exit on mongodb error
mongoose.connection.on('error',(err)=>{
    logger.error(`Mongodb connection error: ${err} `);
    process.exit(1);
});

//mongodb debug mode
if(process.env.NODE_ENV !== "production"){
    mongoose.set("debug", true);
}

//mongodb connection 
mongoose.connect(DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    logger.info("Connected to Mongodb.");
});

//console.log(process.env.NODE_ENV);
let server;
server = app.listen(PORT, () => {
    logger.info(`Server is listening at ${PORT}...`);
});

//socket io

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_ENDPOINT,
    },
});

io.on("connection", (socket) => {
    logger.info("socket io connected successfully");
    SocketServer(socket, io);
});



//handle server errors

const exitHandler = () => {
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    } else{
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);


//SIGTERM
process.on("SIGTERM", ()=>{
    if(server){
        logger.info("Server closed.");
        process.exit(1);
    }
});