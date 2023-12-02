import express from "express";
import { isUser } from "../auth/auth.middleware.js";
import { addTodo, deleteTodo, editTodo, getTodoDetails } from "./todo.service.js";
import { Todo } from "./todo.model.js";
import { paginationValidationSchema } from "./todo.validation.js";


const router= express.Router();


//add todo
router.post("/todo/add",isUser,addTodo);


//delete a todo item
router.delete("/todo/delete/:id",isUser,deleteTodo);

//edit a todo item
router.put("/todo/edit/:id",isUser,editTodo);

//get all todo details
router.get("/todo/details/:id",isUser,getTodoDetails);


// get all todo list
router.post("/todo/user/all",isUser,async(req,res)=>{
    const paginationDetails= req.body;
    try {
        await paginationValidationSchema.validateAsync(paginationDetails);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
    //calculate skip
    const skip= (paginationDetails.page-1)*paginationDetails.limit;


    //extract searchText    
    const searchText= paginationDetails?.searchText;

    let match={}
    match.userId=req.userInfo._id;
    if (searchText){
        match.title={$regex:searchText,$options:"i"};
    }
    //start find query
    const todos= await Todo.aggregate([
        {
            $match:match,
        },
        {
            $sort:{
                createdAt:-1,
            },
        },
        {
            $skip:skip,
        },
        {
            $limit:paginationDetails.limit,
        },
        {
            $project:{
                title:1,
                date:1,
            }
        }
    ]);

    //total products
    const totalMatchingProduct= await Todo.find({
        userId:req.userInfo._id,
    }).count();
 
    //page calculation
    const totalPage=Math.ceil(totalMatchingProduct/paginationDetails.limit);
    return res.status(200).send({todos,totalPage});

});





export default router;