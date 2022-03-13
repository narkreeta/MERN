import express from "express";
import "dotenv/config";
import MongoDb from "./db/mongo.js";
import AskQuestion from "./db/models/AskQuestion.js";

const app = express();
MongoDb(process.env.DATABASE_URL); //mongo connection function

app.use(express.json());
app.use((req, res, next) => {
  console.log("time:", Date.now());
  next();
});


app.post("/askquestion", (req, res) => {
  try {
    const user = new AskQuestion(req.body);
    user.save();
    res.status(201).send("created!");
  } catch (error) {
    res.status(404).json(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("app started successfully", process.env.PORT);
});
