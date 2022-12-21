const express = require('express')
const path = require('path')
const { userSession, adminSession, userLoggedSession } = require('../helpers/session-helpers')
const { genPass, getPass } = require('../helpers/password-helper')
const { preregister, registerUser } = require('../model/user.model')
const { login } = require('../model/userAndAdminLogin.modal')
const router = express.Router()

router.get('/', userSession, adminSession, (req, res) => {
    res.status(200).render('loginAndRegister/login', {
        valid: req.session.login
    })
    req.session.login = false
})

router.post('/login', userSession, adminSession, async (req, res) => {
    await login(req.body)
        .then(async (data) => {
            if (data.val == 'admin') {
                req.session.admin = true;
                res.status(200).redirect('/admin/dashboard')
            }
            if (data.val == 'user') {
                req.session.user = true
                req.session.userId = data.id
                await getPass(req.body.password, data.hash)
                    .then(passCheck => {
                        if (passCheck) res.status(200).redirect(`/user/home/${data.id}`)
                        else {
                            req.session.login = true
                            req.session.user = false
                            res.redirect('/')
                            return
                        }
                    })
            }
            if (data.val == 'wrong credentials') {
                req.session.login = true
                req.session.user = false
                res.status(401).redirect('/')
            }
        })
        .catch(err => {
            console.log('login error', err);
        })

})
router.route('/preregister')
    .all(userSession, adminSession)
    .get((req, res) => {
        res.status(200).render('loginAndRegister/pre-register', {
            emailExist: req.session.emailExist
        })
        req.session.emailExist = false
    })
    .post(async (req, res) => {
        if (req.body.email != 'admin@gmail.com') {

            if (req.body.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) && req.body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
                let hash = null;
                await genPass(req.body.password).then(response => {
                    hash = response
                })
                await preregister(req.body, hash)
                    .then(response => {
                        if (!response) {
                            req.session.emailExist = true
                            res.status(403).redirect('/preregister')
                        }
                        else {
                            // req.session.user = true
                            res.status(201).redirect(`/register/${response}`)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            else {
                console.log("err");
            }
        } else {
            req.session.emailExist = true
            res.status(403).redirect('/preregister')
        }
    })

router.route('/register/:id')
    .all(userSession, adminSession)
    .get((req, res) => {
        let id = req.params.id
        res.status(200).render('loginAndRegister/register', { id })
    })
    .post(async (req, res) => {
        let id = req.params.id
        await registerUser(req.body, id)
            .then(response => {
                if (!response) res.send('not added')
                else {
                    if (req.files) {
                        req.files.image.mv(path.join(__dirname, '../', 'public', 'img', `${id}.png`))
                    }
                    req.session.user = true
                    req.session.userId = id
                    res.status(201).redirect(`/user/home/${id}`)
                }
            })
            .catch(err => {
                console.log('register error :', err);
            })

    })

module.exports = router