const { MongoClient } = require("mongodb");

const state = {
  db: null
}

async function connect(done) {
  const URL = 'mongodb+srv://aswin:ja06QOKl7Yrta1rA@mini-project.vdxmyq7.mongodb.net/?retryWrites=true&w=majority'
  const dbname = 'miniproject'

  await MongoClient.connect(URL)
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
