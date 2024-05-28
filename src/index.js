import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import router from "./routes/router.js";
import cors from "cors";


dotenv.config();
const CONTAINER_PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json()) ; // api
app.use(express.urlencoded({extended:true})); // vistas
app.use(express.static("html")); // static files
/* app.use((_, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); // or 'localhost:8888'
  res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  return next();
}); // sets headers before routes */

connectDB();
app.get("/",(req,res)=>{
    res.json({message:"Hello World"});
})

app.use("/api",router);

app.listen(CONTAINER_PORT ,()=>{

})