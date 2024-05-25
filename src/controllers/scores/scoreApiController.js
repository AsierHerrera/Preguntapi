import scoreController from "./scoreController.js";

const getAll = async (req, res) => {
    try {
        const scores = await scoreController.getAll();
        res.json( scores );
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las preguntas" });
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("El id es:", id)
        const score = await scoreController.getById(id);
        if (score) {
            res.json({ data: score });
        } else {
            res.status(404).json({ message: "Score no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el score" });
    }
};

const getByProperty = async (req, res) => {
    try {
        const { property, value } = req.query;
        console.log("LA REQ QUERY ES:", req.query)
        const scores = await scoreController.getByProperty(property, value);
        //console.log("SCORES ES:", scores)
        res.json({ data: scores });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las preguntas" });
    }
};

const create = async (req, res) => {
    try {
        const score = await scoreController.create(req.body);
        res.status(201).json({ data: score });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la pregunta" });
    }
};


const update = async (req, res) => {
    try {
        const id = req.params.id;
        const score = await scoreController.update(id, req.body);
        if (score) {
            res.json({ data: score });
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
        const score = await scoreController.remove(id);
        if (score) {
            res.json({ message: "Pregunta eliminada", data: score });
        } else {
            res.status(404).json({ message: "Pregunta no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la pregunta" });
    }
};

const getBycategory = async (req, res) => {
    try {
        const category = req.params.category; // Obtener la categoría desde los parámetros de la URL
        console.log("req.params.category", req.params.category)
        const categories = await scoreController.getBycategory(category); // Obtener las preguntas de la categoría
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

const getAllscores = async (req, res) => {
    try {
        const scores = await scoreController.getAllscores();
        res.json({ scores });
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
    getBycategory,
    getAllscores,
    remove    
};
