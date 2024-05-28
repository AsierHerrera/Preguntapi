import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getAll = async()=> {
    try {
        const users = await userModel.find();
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}
const getById = async(id) =>{
    try {
        const user = await userModel.findById(id);
        return user;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}
const getByProperty = async(property,value) =>{
    try {
        const user = await userModel.find({[property]:value})
        return user;
    } catch (error) {
        return null;
    }
}

const login = async(data) =>{
    const {email,username,password} = data;
    if((!email && !username ) || !password){
        return {error:"faltan datos",status:400};
    }
    try {
        let user;
        if(email){
            const users = await getByProperty("email",email);
            user = users[0];
        }
        else{
            const users = await getByProperty("username",username);
            user = users[0];
        }

        if(!user){
            return {error:"No existe el usuario",status:400};
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return {error:"Combinación de usuario y contraseña erroneos",status:400};
        }

        const token = jwt.sign({_id:user._id,username:user.username,role:user.role},process.env.JWT_SECRET,{expiresIn: 60 * 60})
        return {token, user};

        
    } catch (error) {
        console.error(error);
        return {error:"Ha habido un error",status:500};
    }
}
const register = async (data) => {
    try {
        const {username, password, passwordRepeat} = data;

        if (!username || !password || !passwordRepeat) {
            return {error: "Falta alguno de los campos"};
        }

        if (password !== passwordRepeat) {
            return {error: "Las contraseñas no coinciden"};
        }

        const userData = {
            username,
            password,
            role: "user"
        };
        const user = await create(userData);
        return user;
    } catch (error) {
        console.error('Error:', error);
        return {error: "Error al registrar el usuario"};
    }
};


const create = async (data) => {
    try {
        // Verificar si ya existe un usuario con el mismo nombre de usuario
        const existingUser = await userModel.findOne({ username: data.username });

        if (existingUser) {
            // Si ya existe un usuario con el mismo nombre de usuario, devolver un error
            return { error: 'El nombre de usuario ya está en uso' };
        }

        // Si no existe un usuario con el mismo nombre de usuario, proceder con la creación
        const hash = await bcrypt.hash(data.password, 10);
        data.password = hash;
        const user = await userModel.create(data);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const update = async(id,data) =>{
    try {
        const user = await userModel.findByIdAndUpdate(id,data);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const user = await userModel.findByIdAndDelete(id);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const addQuestion = async(userId,questionId)=>{
    try {

        const user = await getById(userId);

        if(!user.questions.includes(questionId)){
            user.questions.push(questionId);
            await user.save();
            return user;
        }
        return user;
    } catch (error) {
        console.error(error);
        return {error:"no se ha podido añadir la pregunta"};
    }
}

export const functions = {
    getAll,
    getById,
    getByProperty,
    login,
    register,
    create,
    update,
    remove,
    addQuestion
}

export default functions;