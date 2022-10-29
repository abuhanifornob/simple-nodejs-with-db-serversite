const express=require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
const cors=require("cors");
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
const users=[
    {id:1,name:'Abu hanif',email:"bafcse1@gmail.com"},
    {id:2,name:'Abu  Kalam',email:"hanifcse2@gmail.com"},
    {id:3,name:'Abu Hossain',email:"hanifcse3@gmail.com"},
    {id:4,name:'Abu Bokkor',email:"hanifcse4@gmail.com"},
]



const uri = "mongodb+srv://dbUser1:IlpQ2YXb0iAcUrRC@cluster0.yzpztol.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run(){
    try{
        const userCollection=client.db("simpleNode").collection("users");
        // const user={
        //     name:"taharat",
        //     email:"taratbanu@gmail.com"
        // }
        // const result=await userCollection.insertOne(user);
        app.get("/users",async (req,res)=>{
            // if(req.query.name){
            //     const search=req.query.name;
            //     const filtered=users.filter(us=>us.name.toLocaleLowerCase().indexOf(search)>=0);
            //     res.send(filtered);
            // }
            const cursor=userCollection.find({});
            const users=await cursor.toArray()
            res.send(users);
        })
        
        app.post("/users",async(req,res)=>{
            console.log("Post Method is runnig");
           const user=req.body;
           const result=await userCollection.insertOne(user);
           result._id=result.insertedId;
           res.send(user);
        })

    }
    finally{

    }
}

run().catch(console.dir)


app.get("/",(req,res)=>{
    res.send("Simple Server API is Running ")
})

// app.get("/users",(req,res)=>{
//     if(req.query.name){
//         const search=req.query.name;
//         const filtered=users.filter(us=>us.name.toLocaleLowerCase().indexOf(search)>=0);
//         res.send(filtered);
//     }
//     res.send(users);
// })

// user: dbUser1
// password: IlpQ2YXb0iAcUrRC
// app.post("/users",(req,res)=>{
//     console.log("Post Method is runnig");
//    const user=req.body;
//    user.id=users.length+1;
//    users.push(user);
//   console.log(req.body);
//    res.send(user);
// })

app.listen(port,()=>{
    console.log(`Simple port running is on ${port}`);
})