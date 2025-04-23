import { Request, Response } from "express";
import express from "express";

import userRouter from "./routes/user";
import gameRouter from "./routes/game";
import scoreRouter from "./routes/score";
import mapRouter from "./routes/map";

const app = express();

app.use("/user", userRouter);
app.use("/game", gameRouter);
app.use("/scores", scoreRouter);
app.use("/maps", mapRouter);

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
