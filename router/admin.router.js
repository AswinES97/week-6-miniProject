const express = require('express')
const router = express.Router()

router.route('/dashboard')
                .get((req,res)=>{
                    res.send("admin dashboard")
                })

router.route('/dashboard/user/:id')
                .get((req,res)=>{
                    res.send("admin single user")
                })
                .post((req,res)=>{
                    res.send("admin new user")
                })
                .patch((req,res)=>{
                    res.send("admin update user")
                })
                .delete((req,res)=>{
                    res.send("admin delete user")
                })

module.exports = router