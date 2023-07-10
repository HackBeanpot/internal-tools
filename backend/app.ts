import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import judgesRouter from "./judging-algorithm/routes/judges-routes.js"
import roomsRouter from "./judging-algorithm/routes/rooms-routes.js"
import rotationTimesRouter from "./judging-algorithm/routes/rotationTimes-routes.js"
import teamsRouter from "./judging-algorithm/routes/teams-routes.js"
import cabinsRouter from "./cabin-sorting/routes/sortedHackers-routes.js"
import { connectJudgingDatabase, connectCabinDatabase } from './connections.js';

const mongoString: string = process.env.DATABASE_URL || ""

const app = express();
const judingDatabase = await connectJudgingDatabase();

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
app.use('/', cabinsRouter);

const PORT = process.env.PORT || 4000;

judingDatabase.on('error', (error) => {
  console.log(error)
})

judingDatabase.once('connected', () => {
  console.log('Database Connected');
})
// databaseCabins.on('error', (error) => {
//   console.log(error)
// })

// databaseCabins.once('connected', () => {
//   console.log('Database Connected');
// })

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

export default app;
