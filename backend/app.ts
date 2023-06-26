import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import judgesRouter from "./judging-algorithm/routes/judges-routes.js"
import roomsRouter from "./judging-algorithm/routes/rooms-routes.js"
import rotationTimesRouter from "./judging-algorithm/routes/rotationTimes-routes.js"
import teamsRouter from "./judging-algorithm/routes/teams-routes.js"

const mongoString: string = process.env.DATABASE_URL || ""
await mongoose.connect(mongoString, {
  dbName: 'Judging',
});
const database = mongoose.connection

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true
  })
);

app.use('/', judgesRouter);
app.use('/', roomsRouter);
app.use('/', rotationTimesRouter);
app.use('/', teamsRouter);

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


