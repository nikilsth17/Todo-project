
import { addValidationSchema } from "./todo.validation.js";
import { Todo } from "./todo.model.js";
import mongoose from "mongoose";


// ===============  add todo list ===================== 
export const addTodo= async(req,res)=>{
    //extract todo from req.body
    const newTodo=req.body;
    // validate with joi 
    try {
        await addValidationSchema.validateAsync(newTodo);
    } catch (error) {
        return res.status(400).send({message:error.message});
        
    }

    newTodo.userId= req.userInfo._id;
    await Todo.create(newTodo);
    return res.status(201).send({message:"Todo is added successfully."});

};



//delete a todo item
export const deleteTodo= async(req,res)=>{
    // extract id from params 
    const todoId= req.params.id;

    // validate id for mongo id validity
    const isValidMongoId= mongoose.Types.ObjectId.isValid(todoId);
    if (!isValidMongoId){
        return res.status(400).send({message:"invalid mongo id"});
    }

    // find todo item
    const todo= await Todo.findOne({_id: todoId});
    if (!todo){
        return res.status(404).send({message:"Todo doesnt exists."});
    }

    // check for todo owernship
    // userInfo id must match with todo's userId
    const isOwnerOfTodo = todo.userId === req.userInfo._id;
    if (isOwnerOfTodo){
        return res.status(403).send({message:"it isnot belong to you.."});
    }

    //delete product
    await Todo.deleteOne({_id:todoId});
    return res.status(200).send("deleted successfull..");
}


//================     edit a todo item    =====================
export const editTodo=async(req,res)=>{
    const todoId= req.params.id;
    const newValues= req.body;

    //validate id from mongoid validity
    const isValidMongoId=mongoose.Types.ObjectId.isValid(todoId);
    if (!isValidMongoId){
        return res.status(400).send({message:"Invalid mongoId.."});
    }

    //validate newvalues from req.body
    try {
        await addValidationSchema.validateAsync(newValues);
    } catch (error) {
        return res.status(404).send({message:error.message});
    }

    //check for product existence using productId
    const todo= await Todo.findOne({_id:todoId});
    if (!todo){
        return res.status(400).send({message:"Product not exist.."});
    }

    //check if userinfo is owner of product
    const isOwnerOfProduct= todo.userId=== req.userInfo._id;
    if(isOwnerOfProduct){
        return res.status(403).send({message:"You arenot owner of this product."});
    }

    //update product
    await Todo.updateOne({_id:todoId},newValues);
    return res.status(200).send({message:"the todo is successfully edited.."});
}

//===============  get the product details =============================
export const getTodoDetails=async(req,res)=>{
    const todoId= req.params.id;
    const isValidMongoId= mongoose.Types.ObjectId.isValid(todoId);
    if (!isValidMongoId){
        return res.status(400).send({message:"Invalid mongoId..."});
    }
    const todo= await Todo.findById(todoId);
    if (!todo){
        return res.status(404).send({message:"Product doesnot exists.."});
    }
    return res.status(200).send(todo);
};


