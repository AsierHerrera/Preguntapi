import categoryController from "./categoryController.js";

const getAll = async (req, res) => {
    try {
        const categories = await categoryController.getAll();
        res.json( categories );
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las preguntas" });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await categoryController.getById(id);
        if (category) {
            res.json({ data: category });
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
        const categories = await categoryController.getByProperty(property, value);
        res.json({ data: categories });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las preguntas" });
    }
};

const create = async (req, res) => {
    try {
        const category = await categoryController.create(req.body);
        res.status(201).json({ data: category });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la pregunta" });
    }
};


const update = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await categoryController.update(id, req.body);
        if (category) {
            res.json({ data: category });
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
        const category = await categoryController.remove(id);
        if (category) {
            res.json({ message: "Pregunta eliminada", data: category });
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
        const categories = await categoryController.getByCategory(category); // Obtener las preguntas de la categoría
        if (categories.length > 0) {
            res.json({ data: categories });
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
