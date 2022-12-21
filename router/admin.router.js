const express = require('express')
const path = require('path')
const { registerUser, preregister } = require('../model/user.model')
const { adminSession, userSession, adminLoggedIn } = require('../helpers/session-helpers')
const { getAllUsers, getSingleUser, deleteUser, updateUser } = require('../model/admin.model')
const { genPass } = require('../helpers/password-helper')
const router = express.Router()

router.route('/dashboard')
    .all(adminLoggedIn, userSession)
    .get(async (req, res) => {
        getAllUsers()
            .then((data => {
                res.status(200).render('admin/adminDashboard', {
                    admin: true,
                    data: JSON.parse(JSON.stringify(data))
                })
            }))
            .catch(err => {
                console.log(err);
            })
    })

router.route('/dashboard/user/:id')
    .all(adminLoggedIn, userSession)
    .get(async (req, res) => {
        let id = req.params.id
        await getSingleUser(id)
            .then(user => {
                res.status(200).render('admin/adminSingleUserEdit', {
                    admin: true,
                    user
                })
            })
            .catch(err => {
                console.log(err);
            })

    })

    .post(async (req, res) => {
        let id = req.params.id
        if (req.files) {
            req.files.image.mv(path.join(__dirname, '../', 'public', 'img', `${id}.png`))
        }
        updateUser(id, req.body).then(updateRes => {
            if (updateRes == 1)
                res.status(201).redirect('/admin/dashboard')
            else
                res.status(304).redirect('/admin/dashboard')
        })
    })

router.post('/dashboard/delete/:id', adminLoggedIn, userSession, async (req, res) => {
    let id = req.params.id
    await deleteUser(id)
        .then(del => {
            if (del)
                res.status(200).redirect('/admin/dashboard')
            else
                res.status(404).redirect('/admin/dashboard')

        })
        .catch(err => {
            console.log(err)
        })
})

router.route('/dashboard/add')
    .all(adminLoggedIn, userSession)
    .get((req, res) => {
        res.status(200).render("admin/adminNewUser")
    })
    .post(async (req, res) => {
        let hash = null;
        await genPass(req.body.password).then(response => {
            hash = response
        })
        await preregister(req.body, hash)
            .then(async id => {
                if (!id) res.redirect('/admin/dashboard/add')
                else {
                    await registerUser(req.body, id)
                        .then(response => {
                            if (response) {
                                if (req.files) {
                                    req.files.image.mv(path.join(__dirname, '../', 'public', 'img', `${id}.png`))
                                }
                                res.redirect('/admin/dashboard')
                            }
                            else {
                                res.redirect('/admin/dashboard')

                            }
                        })
                }
            })
    })

router.get('/logout', (req, res) => {
    req.session.admin = false
    res.status(200).redirect('/')
})



module.exports = router