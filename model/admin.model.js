const { ObjectId } = require('mongodb')
const { USER_COLLECTION } = require('../connection/collections')
const db = require('../connection/connection')

function getAllUsers() {
    return new Promise(async (resolve, reject) => {
        const data = await db.get().collection(USER_COLLECTION).find().toArray()
        resolve(data)

    })

}
function getSingleUser(id) {
    return new Promise(async (resolve, reject) => {
        let userData;
        await db.get()
            .collection(USER_COLLECTION)
            .findOne({ _id: ObjectId(id) })
            .then(data => {
                userData = data
            })
        if (userData != null) resolve(userData)
        else reject("some Error , single User!")
    })
}
function updateUser(id, data) {
    return new Promise(async (resolve, reject) => {
        const userData = {
            name: data.name,
            age: Number(data.age),
            phoneNo: Number(data.phnno),
            address: data.address,
            state: data.state,
            postcode: Number(data.postcode),
            description: data.description
        }
        const response = await db.get().collection(USER_COLLECTION).updateOne({ _id: ObjectId(id) }, { $set: { userData } })
        resolve(response.modifiedCount)

    })
}
function deleteUser(id) {
    return new Promise(async (resolve, reject) => {
        await db.get()
            .collection(USER_COLLECTION)
            .deleteOne({ _id: ObjectId(id) })
            .then(res => {
                resolve(res.deletedCount)
            })
            .catch(err => {
                reject(err)
            })
    }
    )
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}