const db = require('../connection/connection')
const { ADMIN_COLLECTION, USER_COLLECTION } = require('../connection/collections');

function login(loginData) {
    return new Promise(async (resolve, reject) => {
        let credentials = {
            email: loginData.email,
            password: loginData.password
        }
        await db
            .get()
            .collection(ADMIN_COLLECTION)
            .findOne({ email: credentials.email })
            .then(response => {
                if (response != null && response.password == loginData.password) {
                    resolve({ val: 'admin' })
                } else {
                    return
                }
            })
            .catch(err => {
                reject(err)
            })

        await db
            .get()
            .collection(USER_COLLECTION)
            .findOne({ email: credentials.email })
            .then(async response => {
                if (response != null) {
                    resolve({ val: 'user', id: response._id, hash: response.hash })
                } else {
                    resolve({val:'wrong credentials'})

                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    login
}