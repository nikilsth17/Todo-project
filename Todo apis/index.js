import express from "express";
import {dbConnect} from "./db_connect.js";
import userRoutes from "./user/user.route.js";

const app= express();

//to make app understand json
app.use(express.json());

//register routes
app.use(userRoutes);

dbConnect();
//create port
// const port= 8000;
const port= process.env.PORT;
console.log(port);
app.listen(port,()=>{
    console.log(`App is listening on port ${port}.`);
})