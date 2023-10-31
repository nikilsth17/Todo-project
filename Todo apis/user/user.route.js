import express from "express";
import { loginUser, registerUser } from "./user.service.js";

const router= express.Router();


//register users
router.post("/user/register",registerUser);

//login user
router.post("/user/login",loginUser);


export default router;