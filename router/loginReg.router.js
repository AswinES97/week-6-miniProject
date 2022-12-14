const express = require('express')
const {
    preregister,
    registerUser,
} = require('../model/user.model')
const { login } = require('../model/userAndAdminLogin.modal')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).render('loginAndRegister/login')
})

router.post('/login', async (req, res) => {
    const data = await login(req.body)
    if (data.val == 'admin')
        res.status(200).redirect('/admin/dashboard')
    if (data.val == 'user')
        res.status(200).redirect(`/user/home/${data.id}`)
    if (data.val == 'wrong credentials')
        res.status(401).redirect('/')
})

router.route('/preregister')
    .get((req, res) => {
        res.status(200).render('loginAndRegister/pre-register')
    })
    .post(async (req, res) => {
        let id = await preregister(req.body)
        if (!id) res.send('not added')
        else res.status(201).redirect(`/register/${id}`)
    })

router.route('/register/:id')
    .get((req, res) => {
        let id = req.params.id
        res.status(200).render('loginAndRegister/register', { id })
    })
    .post(async (req, res) => {
        let id = req.params.id
        let data = await registerUser(req.body, id)
        if (!id) res.send('not added')
        else res.status(201).redirect(`/user/home/${id}`)
    })

module.exports = router