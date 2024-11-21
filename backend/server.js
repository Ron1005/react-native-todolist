const express = require('express')
const { MongoClient } = require("mongodb");
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const app = express()
app.use(cors())
app.use(bodyParser.json());
const uri = `mongodb+srv://s3998327:rohan1998@cluster1.v0c30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`
const client = new MongoClient(uri);

app.get('/',(req,res)=>{
    return res.json({
        name:"Rohan",
        id:"123"
    })
})

app.get('/gettodos',async (req,res)=>{
    const database = client.db('ToDodatabase');
    const listings = database.collection('ToDoCollection');
    const sample_data = listings.find()
    let array =[]
    for await (const doc of sample_data) {
        array.push({
            id:doc._id,
            title:doc.title,
            note:doc.note
        })
      }
    res.json(array)
    res.status(200)
})

app.post('/addtodo',async (req,res)=>{
    const database = client.db('ToDodatabase');
    const listings = database.collection('ToDoCollection');
    const newRecord = {
        _id: uuidv4(),
        title:req.body.title,
        note:req.body.note
    }
    const response = await listings.insertOne(newRecord)
    if(response.acknowledged == true){
        console.log("Inserted Successfully")
        res.status(200)
        res.json({status:"success"})
    }
    else
    {
        res.status(500)
        res.json({status:"error"})
    }
})

app.delete('/deletetodo',async(req,res)=>{
    const database = client.db('ToDodatabase');
    const listings = database.collection('ToDoCollection');
    console.log(req.body.id)
    const response = await listings.deleteOne({_id:req.body.id})
    if(response.acknowledged && response.deletedCount==1){
        res.status(200)
        res.json({status:"success"})
    }
})

app.post('/updatetodo',async(req,res)=>{
    const database = client.db('ToDodatabase');
    const listings = database.collection('ToDoCollection');
    const options = { upsert: true };
    console.log(req.body.id)
    const updateDoc = {
      $set: {
        title: req.body.title,
        note: req.body.note
      },
    };
    const response = await listings.updateOne({_id:req.body.id},updateDoc,options)
    console.log(response)
    if(response.acknowledged){
        res.status(200)
        res.json({status:"success"})
    }
})

const PORT = process.env.PORT || 3000
app.listen(3001,()=>{
    console.log("App is listening on Port 3001")
})
