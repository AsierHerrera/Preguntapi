import questionModel from "../../models/questionModel.js";

const getAll = async()=> {
    try {
        const questions = await questionModel.find();
        return questions;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const question = await questionModel.findById(id);
        return question;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}
const getByProperty = async(property,value) =>{
    try {
        const question = await questionModel.find({[property]:value})
        return question;
    } catch (error) {
        return null;
    }
}
const create = async(data) =>{
    try {
        const question = await questionModel.create(data);
        return question;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const question = await questionModel.findByIdAndUpdate(id,data);
        return question;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const question = await questionModel.findByIdAndDelete(id);
        return question;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}

export default functions;