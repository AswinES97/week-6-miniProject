const express = require('express')
const router = express.Router()

router.route('/login')
                .get((req,res)=>{
                    res.status(200).render('user/login')
                })
                .post((req,res)=>{
                    res.send(req.body)
                })


router.route('/register')
                .get((req,res)=>{
                    res.send('hello')
                })
                .post((req,res)=>{
                    res.send(req.body)
                })

module.exports = router