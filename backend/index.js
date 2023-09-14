import express, { json, response } from "express"
import { PORT } from "./config.js"
import { Book } from "./models/bookModel.js"
import  bookRoute  from './routes/booksRoute.js'
import mongoose, { mongo } from 'mongoose'
import dotenv from 'dotenv'
import cors from "cors"

const app = express()
dotenv.config()

//Option 1 using cors
//Allows all origins with Default
app.use(cors())

//Option 2 using cors
//Allows custom origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-type']
// }))

app.use(express.json())

app.get('/', (request, response) => {
    return response.status(200).send("MERN Stack Tutorial")
})

app.use('/books', bookRoute)



mongoose.connect(process.env.URL_CONNECTION)
    .then( () => {
        app.listen( PORT, () => {
            console.log(`Server running on port: ${PORT}`)
        } )
        console.log("Connection to Data Base done!")
    })
    .catch( (error) => {
        console.log(error)
    })