const bcrypt = require('bcrypt')

function genPass(password) {
    return new Promise(async (resolve, reject) => {
        let hash = await bcrypt.hash(password, 10)
        resolve(hash)
    })
}

function getPass(userPassword, hash) {
    return new Promise(async (resolve, reject) => {
        let pass = await bcrypt.compare(userPassword, hash);
        resolve(pass)
    })
}

module.exports = {
    genPass,
    getPass
}