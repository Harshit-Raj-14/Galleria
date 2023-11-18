const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
var ObjectId = require('mongodb').ObjectId;

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//mongodb configuration
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://galleria:093V7gmcWmkZo9Tg@cluster0.pqp1ybg.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a collection of documents
    const artCollections = client.db("ArtInventory").collection("arts");

    //insert an art to the db: using post method 
    app.post("/upload-art", async(req, res) => {
        const data = req.body;
        const result = await artCollections.insertOne(data);
        res.send(result);
    })

    // //get all arts from database
    // app.get("/all-arts", async(req, res)=>{
    //     const arts = artCollections.find();
    //     const result = await arts.toArray();
    //     res.send(result);
    // })

    //update art data in database : patch or update methods
    app.patch("/art/:id", async(req, res)=>{
        const id=req.params.id;
        //console.log(id);
        const updateArtData = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };

        const updatedDoc = {
            $set:{
                ...updateArtData
            }
        }
        //update
        const result = await artCollections.updateOne(filter, updatedDoc, options);
        res.send(result);
    })


    //delete an art data : patch or update method
    app.delete("/art/:id", async(req, res)=>{
        const id=req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await artCollections.deleteOne(filter);
        res.send(result);
    })


    //find by category
    app.get("/all-arts", async(req, res) =>{
        let query = {};
        if(req.query?.category){
            query = {category: req.query.category}
        }
        const result = await artCollections.find(query).toArray();
        res.send(result);
    })


    //to get single art data
    app.get("/art/:id", async(req, res) =>{
      const id = req.params.id;
      const filter = { _id: new ObjectId(id)};
      const result = await artCollections.findOne(filter);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})