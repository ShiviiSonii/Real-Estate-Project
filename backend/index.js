import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=> {
        console.log("DB connected")
    })
    .catch((err) => {
        console.log("Error occured while connecting the database")
    })


const app = express()
const port = process.env.PORT | 3000

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})