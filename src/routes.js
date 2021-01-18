const express = require('express')
const router = express.Router()

const { createUser, getUserById, getAllUsers, updateUser, deleteUser } = require('./controllers/UserController')

router.param('id', function (req, res, next, id) {
    req.user = {
        id: id
    }
    next()
})

router.get('/users', async (req, res) => {
    const { status, message } = await getAllUsers()
    res.status(status).send(message)
})

router.get('/users/:id', async (req, res) => {
    const { status, message } = await getUserById(req.user.id)
    res.status(status).send(message)
})

router.post('/users', async (req, res) => {
    const { status, message } = await createUser(req.body)
    res.status(status).send(message)
})

router.put('/users/:id', async (req, res) => {
    const { status, message } = await updateUser(req.user.id, req.body)
    res.status(status).send(message)
})

router.delete('/users/:id', async (req, res) => {
    const { status, message } = await deleteUser(req.user.id)
    res.status(status).send(message)
})

module.exports = router