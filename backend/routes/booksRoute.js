import express from "express"
import { Book } from "../models/bookModel.js"

const router = express.Router()

// Saving a new book in DB
// It works wth raw file in Postman
router.post('/', async (request, response) => { //1st parameter is the route
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Title, author and publishYear fields are required'
            })
        }        

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook)

        return response.status(200).send(book)

    } catch (error) {
        console.log(error)
        response.status(500).send({
            message: error.message
        })
    }
})

//Getting al books from DB
router.get('/', async (request, response) => {
    try {

        const books = await Book.find({})

        return response.status(200).json({
            bookList: books.length,
            books
        })

    } catch (error) {
        console.log(error.message)
        response.status(500).send({
            message: error.message
        })
    }
})

//Getting a single book
router.get('/:id', async (request, response) => {
    try {

        const {id} = request.params

        const books = await Book.findById(id)

        return response.status(200).json(books)

    } catch (error) {
        console.log(error.message)
        response.status(500).send({
            message: error.message
        })
    }
})

//Updating a book
router.put('/:id', async (request, response) => {
    try {

        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: 'Title, author and publishYear fields are required'
            })
        }

        const {id} = request.params

        const result = Book.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).json({
                message: 'Book not found'
            })
        }

        return response.status(200).send({
            message: 'Book updated succesfully',
            result
        })
        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({
            message: error.message
        })
    }
})

//Deleting a book
router.delete('/:id', async (request, response) => {

    try {

        const {id} = request.params

        const result = await Book.findByIdAndDelete(id)

        if (!result) {
            return response.status(404).json({
                message: 'Book not found'
            })
        }

        return response.status(200).send({
            message: 'Book deleted'
        })
        
    } catch (error) {
        console.log(error.message)
        response.status(500).send({
            message: error.message
        })
    }

})

export default router