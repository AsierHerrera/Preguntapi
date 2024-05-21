import questionController from "./questionController.js";

const getAll = async(req,res)=>{
    const questions = await questionController.getAll();
    res.json({data:questions});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const question = await questionController.getById(id);
    res.json({data:question});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const questions = await questionController.getByProperty(property,value);
    res.json({data:questions})
}

const create = async(req,res)=>{
    const question = await questionController.create(req.body);
    res.json({data:question})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const question = await questionController.update(id,req.body);
    res.json({data:question})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const question = await questionController.remove(id);
    res.json({data:question})
}

export default{
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}

