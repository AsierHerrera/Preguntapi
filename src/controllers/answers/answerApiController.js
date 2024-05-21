import answerController from "./answerController.js";

const getAll = async(req,res)=>{
    const answers = await answerController.getAll();
    res.json({data:answers});
}

const getById = async (req,res) =>{
    const id = req.params.id
    const answer = await answerController.getById(id);
    res.json({data:answer});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const answers = await answerController.getByProperty(property,value);
    res.json({data:answers})
}

const create = async(req,res)=>{
    const answer = await answerController.create(req.body);
    res.json({data:answer})
}

const update = async(req,res)=>{
    const id =req.params.id;
    const answer = await answerController.update(id,req.body);
    res.json({data:answer})
}

const remove = async(req,res)=>{
    const id= req.params.id;
    const answer = await answerController.remove(id);
    res.json({data:answer})
}

export default{
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}

