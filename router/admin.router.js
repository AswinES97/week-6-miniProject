const express = require('express')
const { getAllUsers,getSingleUser,deleteUser, updateUser } = require('../model/admin.model')
const router = express.Router()

router.route('/dashboard')
                .get(async(req,res)=>{
                    const data = await getAllUsers()
                    res.status(200).render('admin/adminDashboard',{
                        admin:true,
                        data:JSON.parse(JSON.stringify(data))
                    })
                })

router.route('/dashboard/user/:id')
                .get(async(req,res)=>{
                    let id = req.params.id
                    const user = await getSingleUser(id)
                    res.status(200).render('admin/adminSingleUserEdit',{
                        admin:true,
                        user
                    })
                })
                .post(async(req,res)=>{
                    let id = req.params.id
                    const updateRes = await updateUser(id,req.body)
                    if(updateRes == 1) 
                            res.status(201).redirect('/admin/dashboard')
                    else
                            res.status(304).redirect('/admin/dashboard')
                })
                
router.post('/dashboard/delete/:id',async(req,res)=>{
                    let id = req.params.id
                    const deleteRes = await deleteUser(id)
                    if(deleteRes)
                        res.status(200).redirect('/admin/dashboard')
                    else
                        res.status(404).redirect('/admin/dashboard')

                })

module.exports = router