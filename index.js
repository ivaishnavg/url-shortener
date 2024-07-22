const express = require("express");
const connectToMongoDb = require("./connection")
const path =require("path")
const cookieParser = require("cookie-parser")
const{restrictToLoggedin, checkAuth}= require("./middleware/auth")

const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticroute")
const userRouter =require("./routes/user")

const app = express()
const port = 8001


connectToMongoDb("mongodb://127.0.0.1:27017/urls-shortener")
    .then(()=> console.log("Mongodb Is Connected"))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

app.use("/url",restrictToLoggedin, urlRouter)
app.use("/user", userRouter)
app.use("/", checkAuth, staticRouter)

app.listen(port, ()=> console.log("Server is Started at ", port))