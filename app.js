const express = require('express')
const path = require('path')
const logger = require('morgan')
const hbs = require('express-handlebars')
const fileUpload = require('express-fileupload')
const loginRegRouter = require('./router/loginReg.router')
const userRouter = require('./router/user.router')
const adminRouter = require('./router/admin.router.js')
const app = express()

app.engine( 'hbs', hbs.engine( { 
    extname: 'hbs', 
    defaultLayout: 'layout', 
    layoutsDir: path.join(__dirname ,'views','layout'),
    partialsDir: path.join(__dirname ,'views','partials')
}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(fileUpload())
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))


app.use('/',loginRegRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use('/logout',(req,res)=>{
    res.status(200).redirect('/')
})
app.use('/*',(req,res)=>{
    res.status(404).render('404/404')
})

module.exports = app