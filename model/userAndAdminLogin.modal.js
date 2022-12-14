const db = require('../connection/connection')

async function login(loginData) {
    const admin = 'admin@123'
    if (loginData.email == admin) {
        const adminData = await db.get().collection('admin').findOne({ email: admin })
        if (adminData.password == loginData.password)
            return { val: 'admin' }
    } else {
        const [userData] = await db.get().collection('users').find({ email: loginData.email }).project({ email: 1, password: 1, }).toArray()
        if (userData.password == loginData.password)
            return { val: 'user', id: userData._id }
    }
    return {val:'wrong credentials'}

}

module.exports = {
    login
}