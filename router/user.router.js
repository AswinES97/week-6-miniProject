const express = require('express')
const axios = require('axios')
const { getUserData } = require('../model/user.model')
const { adminSession, userLoggedSession } = require('../helpers/session-helpers')
const router = express.Router()

router.route('/home/:id')
    .all(userLoggedSession, adminSession)
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

        await getUserData(id)
            .then(userData => {
                res.render("user/user", {
                    admin: false,
                    user: true,
                    id,
                    quote,
                    author,
                    userData
                })
            })
            .catch(err => {
                console.log(err);
            })
    })

router.get('/logout', (req, res) => {
    req.session.user = false
    res.status(200).redirect('/')
})

module.exports = router