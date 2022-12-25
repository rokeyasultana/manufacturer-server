const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello from Manufacturer Website')
});

//mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4wa67.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
await client.connect();
console.log('database connceted');

//parts
const partsCollection = client.db('manufacturer-website').collection('parts');
app.get('/part', async (req, res)=>{
    const query = {};
    const cursor = partsCollection.find(query);
    const parts = await cursor.toArray();
    console.log(parts);
    res.send(parts) ;
  });
  

    }

    finally{

    }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Manufacturer website listening on port ${port}`)
})