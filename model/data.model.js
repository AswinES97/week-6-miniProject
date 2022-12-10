const { MongoClient } = require("mongodb");
const URL = 'mongodb+srv://Aswines:GdHUomss873zUkfZ@mini-project.vdxmyq7.mongodb.net/Users?retryWrites=true&w=majority'
const client = new MongoClient(URL);

async function run() {
  try {
    const database = client.db('miniproject');
    const movies = database.collection('users');

    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'aswin' };
    const movie = await movies.findOne(query);
    return movie
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
module.exports = run