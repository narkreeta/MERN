import express from "express";
import "dotenv/config";
import MongoDb from "./db/mongo.js";
import AskQuestion from "./db/models/AskQuestion.js";
import cors from "cors";

const app = express();
MongoDb(process.env.DATABASE_URL); //mongo connection function
app.use(cors("http://localhost:3000/"));
app.use(express.json());
app.use((req, res, next) => {
  console.log("time:", Date.now());
  next();
});

//question routers
app.post("/askquestion", (req, res) => {
  try {
    const Que = new AskQuestion(req.body);
    Que.save();
    res.status(201).send("created!");
  } catch (error) {
    res.status(404).json(error.message);
  }
});

app.get("/askquestion", async (req, res) => {
  try {
    const questions = await AskQuestion.find();
    res.send(questions);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/askquestion/:index", async (req, res) => {
  try {
    const questions = await AskQuestion.findOne({ _id: req.params.index });
    res.send(questions);
  } catch (error) {
    res.send(error.message);
  }
});

//update questions
app.patch("/askquestion/:index", async (req, res) => {
  try {
    const questions = await AskQuestion.findOne({ _id: req.params.index });

    if (req.body.question) {
      questions.question = req.body.question;
    }

    await questions.save();
    res.send("Done");
  } catch (error) {
    res.status(400).send(`error: ${error.message}`);
  }
});

// post comments
app.post("/askquestion/:index/comments", async (req, res) => {
  try {
    const Main = await AskQuestion.findOne({ _id: req.params.index });

    const Comments = req.body;
    Main.comments.unshift(Comments);

    await Main.save();
    res.send("post successfully!");
  } catch (error) {
    console.log(error.message);
  }
});

//update comments
app.patch("/askquestion/:index/comments/:id", async (req, res) => {
  try {
    const Main = await AskQuestion.findOneAndUpdate({ _id: req.params.index });
    Main.comments.map((comment) => {
      let cmid = comment._id.toString();
      if (cmid === req.params.id) {
        comment.comment = req.body.comment;
      }
    });
    await Main.save();
    res.send("success!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//delete comment by id
app.delete("/askquestion/:index/comments/:id", async (req, res) => {
  try {
    await AskQuestion.findOneAndUpdate(
      { _id: req.params.index },
      {
        $pull: {
          comments: {
            _id: req.params.id,
          },
        },
      }
    );
    res.send("comment deleted successfully");
  } catch (error) {
    res.send(error.message);
  }
});

//delete the question
app.delete("/askquestion/:index", async (req, res) => {
  try {
    await AskQuestion.deleteOne({ _id: req.params.index });
    res.send("Delete question successfully");
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("app started successfully", process.env.PORT);
});
