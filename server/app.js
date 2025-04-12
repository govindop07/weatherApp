import express from 'express'
import cors from 'cors';
import router from './routes/weather.js';
import dotenv from 'dotenv'
dotenv.config();


const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use('/api', router);

app.listen(3000, (req, res)=>{
  console.log("server is running on 3000")
})