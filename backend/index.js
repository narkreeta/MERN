import express from "express";
import "dotenv/config"

const app = express();

app.use(express.json())
app.use((req, res, next) => {
    console.log("middleware:",req.body)
    next()
  })

app.get('/',(req,res) => {
    res.send("hello")
})

app.post('/data', (req, res) => {
    res.send(req.body)
})

app.listen(process.env.PORT,()=>{
    console.log("app started successfully",process.env.PORT);
})