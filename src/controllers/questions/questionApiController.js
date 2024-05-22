import questionController from "./questionController.js";

const getAll = async (req, res) => {
    try {
        const questions = await questionController.getAll();
        res.json({ data: questions });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las preguntas" });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await questionController.getById(id);
        if (question) {
            res.json({ data: question });
        } else {
            res.status(404).json({ message: "Pregunta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la pregunta" });
    }
};

const getByProperty = async (req, res) => {
    try {
        const { property, value } = req.query;
        const questions = await questionController.getByProperty(property, value);
        res.json({ data: questions });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las preguntas" });
    }
};

const create = async (req, res) => {
    try {
        const question = await questionController.create(req.body);
        res.status(201).json({ data: question });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la pregunta" });
    }
};


const update = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await questionController.update(id, req.body);
        if (question) {
            res.json({ data: question });
        } else {
            res.status(404).json({ message: "Pregunta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la pregunta" });
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await questionController.remove(id);
        if (question) {
            res.json({ message: "Pregunta eliminada", data: question });
        } else {
            res.status(404).json({ message: "Pregunta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la pregunta" });
    }
};

const getByCategory = async (req, res) => {
    try {
        const category = req.params.category; // Obtener la categoría desde los parámetros de la URL
        const questions = await questionController.getByCategory(category); // Obtener las preguntas de la categoría
        if (questions.length > 0) {
            res.json( questions);
        } else {
            res.status(404).json({ message: "No se encontraron preguntas para la categoría especificada" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las preguntas de la categoría" });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryController.getAllCategories();
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las categorías" });
    }
};

export default {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    getByCategory,
    getAllCategories,
    remove    
};
