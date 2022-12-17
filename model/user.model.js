const { ObjectID } = require('bson')
const { USER_COLLECTION } = require('../connection/collections')
const db = require('../connection/connection')

function preregister(data,hash) {``
    return new Promise(async (resolve, reject) => {

        const userLogin = {
            email: data.email,
            hash: hash
        }

        await db
            .get()
            .collection(USER_COLLECTION)
            .updateOne({ email: data.email }, { $set: userLogin }, { upsert: true })
            .then((data) => {
                let id = JSON.parse(JSON.stringify(data.upsertedId))
                resolve(id)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
function registerUser(user, id) {
    return new Promise(async (resolve, reject) => {
        let rtn = null;
        const userData = {
            name: user.name,
            age: Number(user.age),
            phoneNo: Number(user.phnno),
            address: user.address,
            state: user.state,
            postcode: Number(user.postcode),
            description: user.description
        }

        await db.get()
            .collection(USER_COLLECTION)
            .updateOne({ _id: ObjectID(id) }, { $set: { userData } })
            .then((data) => {
                resolve(data.modifiedCount)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
function getUserData(id) {
    return new Promise(async (resolve, reject) => {
        await db.get()
            .collection(USER_COLLECTION)
            .findOne({ _id: ObjectID(id) })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })

    })
}

module.exports = {
    preregister,
    registerUser,
    getUserData,
}