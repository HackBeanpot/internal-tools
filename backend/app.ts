import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config'
import mongoose from "mongoose"
import judgesRoutes from "/judging-algorithm/data/controllers/judges-controller"
const mongoString: string = "mongodb+srv://dbadmin:ijTyfvOMOVOirZXR@hackbeanpotcluster.unazpk3.mongodb.net"
console.log(mongoString)
mongoose.connect(mongoString);
const database = mongoose.connection

const app = express();

app.use(judgesRoutes)

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true
  })
);

const PORT = process.env.PORT || 4000;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});


