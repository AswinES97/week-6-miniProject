const express = require('express')
const path = require('path')
const { adminSession, userSession, adminLoggedIn } = require('../helpers/session-helpers')
const { getAllUsers, getSingleUser, deleteUser, updateUser } = require('../model/admin.model')
const router = express.Router()

router.route('/dashboard')
    .all(adminLoggedIn,userSession)
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
    .all(adminLoggedIn,userSession)
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
        if(req.files){
            req.files.image.mv(path.join(__dirname, '../', 'public', 'img', `${id}.png`))
        }
        updateUser(id, req.body).then(updateRes=>{
            if (updateRes == 1)
                res.status(201).redirect('/admin/dashboard')
            else
                res.status(304).redirect('/admin/dashboard')
        })
    })

router.post('/dashboard/delete/:id',adminLoggedIn,userSession, async (req, res) => {
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
        .get((req,res)=>{
            res.status(200).render("admin/adminNewUser")
        })



module.exports = router