const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const conString = "mongodb://localhost:27017";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get('/get-users',(req,res)=>{
  mongoClient.connect(conString).then(clientObject=>{
    const database=clientObject.db("react-vedio-library");
    database.collection("tblusers").find({}).toArray().then(documents=>{
      res.send(documents);
      res.end();
    })
  })
})

app.post('/register-user',(req,res)=>{
  const user ={
    UserId: req.body.UserId,
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
    Mobile: req.body.Mobile
  };

  mongoClient.connect(conString).then(clientObject=>{
    var database = clientObject.db("react-vedio-library");
    database.collection("tblusers").insertOne(user).then(()=>{
      console.log("user registered.");
      res.end();
    })
  })
});

app.get('/get-admin',(req,res)=>{
  mongoClient.connect(conString).then(clientObject=>{
    const database=clientObject.db("react-vedio-library");
    database.collection("tbladmin").find({}).toArray().then(documents=>{
      res.send(documents);
      res.end();
    })
  })
});

app.get('/get-categories',(req,res)=>{
  mongoClient.connect(conString).then(clientObject=>{
    const database=clientObject.db("react-vedio-library");
    database.collection("tblcategories").find({}).toArray().then(documents=>{
      res.send(documents);
      res.end();
    })
  })
});

app.get('/get-videos',(req,res)=>{
  mongoClient.connect(conString).then(clientObject=>{
    const database=clientObject.db("react-vedio-library");
    database.collection("tblvideos").find({}).toArray().then(documents=>{
      res.send(documents);
      res.end();
    })
  })
});

app.get('/get-videos/:id',(req,res)=>{
  mongoClient.connect(conString).then(clientObject=>{
    const database=clientObject.db("react-vedio-library");
    database.collection("tblvideos").find({VideoId:parseInt(req.params.id)}).toArray().then(document=>{
      res.send(document);
      res.end();
    })
  })
});

app.post('/add-video',(req,res)=>{

  const video={
    VideoId:parseInt(req.body.VideoId),
    Title:req.body.Title,
    Url:req.body.Url,
    Description:req.body.Description,
    Likes:parseInt(req.body.Likes),
    Dislikes:parseInt(req.body.Dislikes),
    Views:parseInt(req.body.Views),
    CategoryId:parseInt(req.body.CategoryId)
  };

  mongoClient.connect(conString).then(clientObject=>{
    const database=clientObject.db("react-vedio-library");
    database.collection("tblvideos").insertOne(video).then(()=>{
      console.log("video added success..");
      res.end();
    })
  })
});

app.put('/edit-video/:id',(req,res)=>{

  const id=parseInt(req.params.id);

  const video={
    VideoId:parseInt(req.body.VideoId),
    Title:req.body.Title,
    Url:req.body.Url,
    Description:req.body.Description,
    Likes:parseInt(req.body.Likes),
    Dislikes:parseInt(req.body.Dislikes),
    Views:parseInt(req.body.Views),
    CategoryId:parseInt(req.body.CategoryId)
  };

  mongoClient.connect(conString).then(clientObject=>{
    const database=clientObject.db("react-vedio-library");
    database.collection("tblvideos").updateOne({VideoId:id},{$set:video}).then(()=>{
      console.log("video edit success..");
      res.end();
    })
  })
});

app.delete('/delete-video/:id',(req,res)=>{

  const id=parseInt(req.params.id);

  mongoClient.connect(conString).then(clientObject=>{
    const database=clientObject.db("react-vedio-library");
    database.collection("tblvideos").deleteOne({VideoId:id}).then(()=>{
      console.log("video delete success..");
      res.end();
    })
  })
});

app.listen(3030,()=>{
  console.log(`app is running on http://localhost:3030`);
})