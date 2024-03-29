import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import judgesRouter from "./judging-algorithm/routes/judges-routes.js"
import roomsRouter from "./judging-algorithm/routes/rooms-routes.js"
import rotationTimesRouter from "./judging-algorithm/routes/rotationTimes-routes.js"
import teamsRouter from "./judging-algorithm/routes/teams-routes.js"
import cabinsRouter from "./cabin-sorting/routes/sortedHackers-routes.js"
import hackerTableRouter from "./judging-algorithm/routes/hackerTable-routes.js"
import judgesTableRouter from "./judging-algorithm/routes/judgeTable-routes.js"

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true
  })
);

app.use('/', cabinsRouter);
app.use('/', judgesRouter);
app.use('/', roomsRouter);
app.use('/', rotationTimesRouter);
app.use('/', teamsRouter);
app.use('/', hackerTableRouter);
app.use('/', judgesTableRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

export default app;
