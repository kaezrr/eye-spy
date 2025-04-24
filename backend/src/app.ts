import express from "express";
import cors from "cors";

import gameRouter from "./routes/game";
import scoreRouter from "./routes/score";
import mapRouter from "./routes/map";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/static", express.static("public"));

app.use("/game", gameRouter);
app.use("/scores", scoreRouter);
app.use("/maps", mapRouter);

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
