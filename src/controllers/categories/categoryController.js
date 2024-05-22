import categoryModel from "../../models/categoryModel.js";
import questionModel from "../../models/questionModel.js";


const getAll = async () => {
    try {
        return await categoryModel.find();
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener todas las preguntas');
    }
};

const getById = async (id) => {
    try {
        return await categoryModel.findById(id);
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener la pregunta por ID');
    }
};

const getByProperty = async (property, value) => {
    try {
        return await categoryModel.find({ [property]: value });
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener preguntas por propiedad');
    }
};

const create = async (data) => {
    try {
        return await categoryModel.create(data);
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la pregunta');
    }
};

const update = async (id, data) => {
    try {
        return await categoryModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la pregunta');
    }
};

const remove = async (id) => {
    try {
        return await categoryModel.findByIdAndDelete(id);
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar la pregunta');
    }
};

const getByCategory = async (category) => {
    try {
        const categories = await categoryModel.find({ category });
        return categories;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las preguntas por categoría');
    }
};

const getAllCategories = async () => {
    try {
        const categories = await categoryModel.find();
        const categoryData = await Promise.all(categories.map(async (category) => {
            console.log("CATEWGORIA", category)
            const count = await questionModel.countDocuments({ category: category.name });
            return {
                name: category.name,
                count_questions: count,
                link: category.link
            };
        }));
        console.log("CATEGORY", categoryData)
        return categoryData;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las categorías');
    }
};

const categoryController = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove,
    getByCategory,
    getAllCategories
};

export default categoryController;
