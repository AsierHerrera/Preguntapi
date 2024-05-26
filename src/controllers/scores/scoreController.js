import scoreModel from "../../models/scoreModel.js";


const getAll = async () => {
    try {
        return await scoreModel.find();
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener todas las preguntas');
    }
};

const getById = async (userid) => {
    try {
        return await scoreModel.find({ user: userid });
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener la pregunta por ID');
    }
};

const getByProperty = async (property, value) => {
    try {
        return await scoreModel.find({ [property]: value });
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener preguntas por propiedad');
    }
};

const create = async (data) => {
    try {
        return await scoreModel.create(data);
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la pregunta');
    }
};

const update = async (id, data) => {
    try {
        return await scoreModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar la pregunta');
    }
};

const remove = async (id) => {
    try {
        return await scoreModel.findByIdAndDelete(id);
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar la pregunta');
    }
};

const getBycategory = async (category) => {
    try {
        const score = await scoreModel.find({ category });
        return score;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las preguntas por categoría');
    }
};

const getAllscores = async () => {
    try {
        const scores = await scoreModel.find();
        const scoreData = await Promise.all(scores.map(async (score) => {
            console.log("CATEWGORIA", score)
            const count = await questionModel.countDocuments({ score: score.name });
            return {
                name: score.name,
                count_questions: count,
                link: score.link
            };
        }));
        console.log("score", scoreData)
        return scoreData;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las categorías');
    }
};

const scoreController = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove,
    getBycategory,
    getAllscores
};

export default scoreController;
