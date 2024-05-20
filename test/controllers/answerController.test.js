import connectDB from "../../src/config/mongo.js";
import mongoose from 'mongoose';
import answerController from "../../src/controllers/answers/answerController.js";
import userController from "../../src/controllers/users/userController.js"

let answerId = null;
let userId = null;
describe("Test de answerController",()=>{
    beforeAll(async ()=>{
        await connectDB();
        try{
            await mongoose.connection.collections["answers"].drop();
        }
        catch(error){
            console.error(error);
        }
    })
    afterAll(async()=>{
        await mongoose.connection.close();
    })

    test("Crear proyecto",async()=>{
        const users = await userController.getAll();
        console.log("usuario",users[0])
        const answerData = {
            name: "pruebas",
            owner: users[0],
            users:users
        }
        const answer = await answerController.create(answerData)
        answerId = answer._id;
        expect(answer).not.toBeNull();
        expect(answer.owner).toEqual(users[0]._id);
    })
    test("Añadir usuario",async()=>{
        const newUser = await userController.create({username:"algo",email:"mail",password:"1234"});
        userId = newUser._id;
        const answer = await answerController.addUser(answerId,newUser._id);
        expect(answer).not.toBeNull();
        expect(answer.users).toContain(newUser._id);

    })
    test("Quitar usuario",async()=>{
        const answer = await answerController.removeUser(answerId,userId);
        expect(answer).not.toBeNull();
        expect(answer.users).not.toContain(userId);
    })
})