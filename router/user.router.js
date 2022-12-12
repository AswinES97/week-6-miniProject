const express = require('express')
const router = express.Router()

router.route('/home/:id')
                .get((req,res)=>{
                    res.render("user/user",{admin:false})
                })

module.exports = router