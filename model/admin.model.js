const { ObjectId } = require('mongodb')
const db = require('../connection/connection')

async function getAllUsers() {
    return await db.get()
    .collection('users')
    .find()
    .toArray()

}
async function getSingleUser(id){
    let userData = null
    await db.get()
        .collection('users')
        .findOne({ _id: ObjectId(id)})
        .then(data => {
            userData = data
        })
    return userData
}
async function updateUser(id,data){
    const userData = {
        name:data.name,
        age:Number(data.age),
        phoneNo: Number(data.phnno),
        address: data.address,
        state:data.state,
        postcode:Number(data.postcode),
        description: data.description
    }
    const response = await db.get().collection('users').updateOne({_id:ObjectId(id)},{$set:{userData}})
    return response.modifiedCount
}
async function deleteUser(id){
    const del = await db.get().collection('users').deleteOne({_id:ObjectId(id)})
    return del.acknowledged
}

module.exports = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}