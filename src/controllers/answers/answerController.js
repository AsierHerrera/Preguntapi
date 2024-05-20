import answersModel from "../../models/answersModel.js";

const getAll = async()=> {
    try {
        const answers = await answersModel.find();
        return answers;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const answer = await answersModel.findById(id);
        return answer;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const create = async(data) =>{
    try {
        const answer = await answersModel.create(data);
        return answer;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const answer = await answersModel.findByIdAndUpdate(id,data);
        return answer;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const answer = await answersModel.findByIdAndDelete(id);
        return answer;
    } catch (error) {
        console.error(error);
        return null;
    }
}
/* const addUser = async(answerId,userId) =>{
    try {
        const answer = await getById(answerId);
        if(!answer.users.includes(userId)){
            answer.users.push(userId);
            await answer.save();
            return answer
        }
        return answer;
    } catch (error) {
        return null;
    }
}
const removeUser = async(answerId,userId)=>{
    try {
        const answer = await getById(answerId);
        if(answer.users.includes(userId)){
            answer.users = answer.users.filter(u=> u!==userId);
            await answer.save();
            return answer
        }
        return answer;
    } catch (error) {
        return null;
    }
} */
export const functions = {
    getAll,
    getById,
    create,
    update,
    remove,
/*     addUser,
    removeUser, */
}

export default functions;