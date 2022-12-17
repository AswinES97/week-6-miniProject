const { MongoClient } = require("mongodb");
const { MONGO_ATLAS } = require('./collections')

const state = {
  db: null
}

async function connect(done) {
  const dbname = 'miniproject'

  await MongoClient.connect(MONGO_ATLAS)
    .then((data)=>{
      console.log("Connected to Database");
      state.db = data.db(dbname)
      done()
    })
    .catch(err=>{
      return done(err)
    })
}

function get(){
  return state.db
}

module.exports = {
  connect,
  get
}
