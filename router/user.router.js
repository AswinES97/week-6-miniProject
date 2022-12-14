const express = require('express')
const axios = require('axios')
const {getUserData} = require('../model/user.model')
const router = express.Router()

router.route('/home/:id')
    .get(async (req, res) => {
        let quote = '';
        let author = ''
        let id = req.params.id

        await axios.request("https://api.quotable.io/random?tags=technology").then(function (response) {
            quote = response.data.content;
            author = response.data.author;

        }).catch(function (error) {
            console.error(error);
        })
        
        let userData = await getUserData(id)
        res.render("user/user", {
            admin: false,
            user: true,
            quote,
            author,
            userData
        })
    })

module.exports = router