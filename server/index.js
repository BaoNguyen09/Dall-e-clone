import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./mongodb/connect.js";

import postRoutes from "./mongodb/routes/postRoutes.js";
import dalleRoutes from "./mongodb/routes/dalleRoutes.js";

dotenv.config();

const app = express();
// middlewares 
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
    res.send("Hello from Dall-E");
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log("Running on port http://localhost:8080"));
    } catch (error) {
        console.log(error);
    }
    
}

startServer();