import questionModel from "../../models/questionModel.js";
import userController from "../users/userController.js";


const getAll = async () => {
    try {
        console.log("SE printa todo")
        return await questionModel.find();
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener todas las preguntas');
    }
};

const getById = async (id) => {
    try {
        return await questionModel.findById(id);
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener la pregunta por ID');
    }
};

const getByProperty = async (property, value) => {
    try {
        return await questionModel.find({ [property]: value });
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener preguntas por propiedad');
    }
};

const create = async (data) => {
    try {
        console.log("llego aqui")
        const question = await questionModel.create(data);
        await userController.addQuestion(data.owner,question._id);
        return question
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la pregunta');
    }
};

const update = async (id, data) => {
    try {
        return await questionModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la pregunta');
    }
};


const globalUpdate = async (data) => {
    try {
        console.log("Llego aqui")
        return await questionModel.updateMany({}, data, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la pregunta de manera global2');
    }
};
const remove = async (id) => {
    try {
        return await questionModel.findByIdAndDelete(id);
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar la pregunta');
    }
};

const getByCategory = async (category) => {
    try {
        const questions = await questionModel.find({ category });
        return questions;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las preguntas por categoría');
    }
};

const getAllCategories = async () => {
    try {
        const categories = await categoryModel.find();
        const categoryData = await Promise.all(categories.map(async (category) => {
            const count = await questionModel.countDocuments({ category: category.name });
            return {
                name: category.name,
                count_questions: count,
                link: category.link
            };
        }));
        return categoryData;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las categorías');
    }
};

const questionController = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove,
    getByCategory,
    globalUpdate,
    getAllCategories
};

export default questionController;
