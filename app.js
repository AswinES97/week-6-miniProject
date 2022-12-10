const express = require('express')
const path = require('path')
const logger = require('morgan')
const loginRegRouter = require('./router/loginReg.router')
const userRouter = require('./router/user.router')
const adminRouter = require('./router/admin.router.js')
const app = express()

app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(logger('dev'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',loginRegRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)

module.exports = app