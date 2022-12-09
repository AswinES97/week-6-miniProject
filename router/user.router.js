const express = require('express')
const router = express.Router()

router.route('/home/:id')
                .get((req,res)=>{
                    res.send("hi")
                })

module.exports = router