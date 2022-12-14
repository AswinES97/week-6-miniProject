const { ObjectID } = require('bson')
const db = require('../connection/connection')

async function preregister(data) {
    let id = null
    const userLogin = {
        email: data.email,
        password: data.password[0]
    }

    await db
        .get()
        .collection('users')
        .updateOne({ email: data.email }, { $set: userLogin }, { upsert: true })
        .then((data) => {
            id = JSON.parse(JSON.stringify(data.upsertedId))
        })
        .catch((data) => {
            id = false
        })

    return id
}
async function registerUser(user, id) {
    let rtn = null;
    const userData = {
        name:user.name,
        age:Number(user.age),
        phoneNo: Number(user.phnno),
        address: user.address,
        state:user.state,
        postcode:Number(user.postcode),
        description: user.description
    }

    await db.get()
        .collection('users')
        .updateOne({ _id: ObjectID(id) }, { $set: { userData } })
        .then((data) => {
            rtn = true
        })
        .catch((data) => {
            rtn = false
        })
    return rtn
}
async function getUserData(id) {
    let userData = null
    await db.get()
        .collection('users')
        .findOne({ _id: ObjectID(id)})
        .then(data => {
            userData = data
        })

    return userData
}

module.exports = {
    preregister,
    registerUser,
    getUserData,
}