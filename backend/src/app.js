import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routers/user.router.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("PORT", process.env.PORT || 8080); 

app.use(cors());
app.use(express.urlencoded({limit:"40kb", extended:true}));
app.use(express.json({limit:"40kb"}))

app.use("/api/user",userRoutes);

const start = async () => {
    app.set("MONGO_USER");
    const connectionDb = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MONGO CONNECTED DB HOST ${connectionDb.connection.host}`)
    server.listen(app.get("PORT"), () => {
      console.log(`LISTENING ON PORT ${app.get("PORT")}`);
    });

};

start();