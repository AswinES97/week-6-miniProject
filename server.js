const http = require('http')
const app = require('./app')
const { connect } = require('./connection/connection')
const PORT = 3000
const server = http.createServer(app)

async function onServer() {
    await connect((err)=>{
        
        if(err) return console.log("Error connecting Db: ",err.codeName);

        server.listen(PORT, () => {
            console.log(`Server listning on http://localhost:${PORT}/login`)
        })
    })
}

onServer()