import Joi from "joi";

export const addValidationSchema= Joi.object({
    title: Joi.string().required().trim().min(2).max(55),
    date: Joi.string().required(),

});


export const paginationValidationSchema= Joi.object({
    page:Joi.number().integer().min(1).required(),
    limit: Joi.number().integer().min(1),
    searchText: Joi.string().trim().allow(""),

});