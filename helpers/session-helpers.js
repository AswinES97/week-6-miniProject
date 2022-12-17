const userSession = (req,res,next)=>{
    if(!req.session.user) next()
    else res.redirect(`/user/home/${req.session.userId}`)
}
const adminSession = (req,res,next)=>{
    if(!req.session.admin) next()
    else res.redirect('/admin/dashboard')
}
const userLoggedSession =(req,res,next)=>{
    if(req.session.user) next()
    else res.redirect(`/`)
}
const adminLoggedIn = (req,res,next)=>{
    if(req.session.admin) next()
    else res.redirect('/')
}

module.exports = {
    userSession,
    adminSession,
    userLoggedSession,
    adminLoggedIn
}