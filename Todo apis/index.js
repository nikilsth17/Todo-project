import express from "express";
import {dbConnect} from "./db_connect.js";
import userRoutes from "./user/user.route.js";
import cors from "cors";
import todoRoutes from "./todo/todo.route.js";

const app= express();
app.use(cors({origin:"*"}));
//to make app understand json
app.use(express.json());

//register routes
app.use(userRoutes);
app.use(todoRoutes);

dbConnect();
//create port
// const port= 8000;
const port= process.env.PORT;
console.log(port);
app.listen(port,()=>{
    console.log(`App is listening on port ${port}.`);
})