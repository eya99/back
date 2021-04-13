const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const fs= require('fs');
const Tables = require("./Models/Tables");
const multer = require('multer');
const { Forum, replaceOne} = require('./Models/forum.model');
const { Publication } = require('./Models/publication.model');
const { Reclamation } = require('./Models/reclamation.model');
var upload = multer({ dest: 'images/' })
var path = require("path");
var request = require('request');
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));



  

app.use(cors());
app.use(bodyParser.json({limit: '60mb'}));
app.use(bodyParser.urlencoded({limit: '60mb', extended: true}));
const categoryRouter = require("./Routes/Category");
const projectRouter = require("./Routes/CreateProject");
var request = require('request');
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

const storage = multer.diskStorage({
    destination: function(req , file , cb ) {
        cb(null, './images/');
    },
    filename: function(req, file, cb){
        cb(null,  file.originalname + '-' + Date.now() +'.jpg');

    }
})


app.use(express.json());

//middlwares
app.use('/posts',()=> {
    console.log('this is a middlwares')
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
//ROUTES
app.get('/',(req,res)=>{
    res.send('we are on home ');
});
app.get('/posts',(req,res)=>{

    res.send('we are on posts ');
});
app.use(cors());
app.use('/uploads', express.static('uploads'))

//how to we start listening to the server 
   
    


    module.exports = {
        Forum
    }
    module.exports = {
        Publication
    }

  

    module.exports = {
        Reclamation
    }
    


    app.use(function(req, res, next) {
    
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });
    

app.use(cors());
app.use(bodyParser.json({limit: '60mb'}));
app.use(bodyParser.urlencoded({limit: '60mb', extended: true}));

mongoose.connect('mongodb://localhost:27017/PIM', {
 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log('cnx failed');
    });
    const AuthRoute2 = require('./Routes/Tables');

const AuthRoute = require('./Routes/Authentification');


app.use('/api/user',AuthRoute);
app.use("/api/category", categoryRouter);
app.use("/api/project", projectRouter );

const AuthRouteProfile = require('./Routes/profile');
const AuthRouteTestJson= require('./Routes/testjson');


app.use("/api/profile", AuthRouteProfile );



app.use('/api/tables',AuthRoute2);
app.use('/api/testjson',AuthRouteTestJson);


//post file json 


  

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype === 'image/jpg'|| file.mimetype === 'application/json') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
var upload = multer({ storage: storage, fileFilter: fileFilter })

//Get file json 

    app.post('/Pforum'  , async (req,res)=> {
      const { titre, description } = req.body;
  console.log({ titre, description })
  
      const forum = new Forum ({
          titre: req.body.titre,
          description: req.body.description,
          image: req.body.image
      });
      try {
          const savedForum = await forum.save();
          res.json(savedForum);
      } catch (err) {
          res.json ({message: err});
      }
  });
  
  app.post("/file", upload.single("image"), function (req, res, next) {
      const file = req.file;
      if (file) {
        res.json(req.file);
      } else throw "error";
    });
  
    
      
    app.get('/file/:fileName', function (req, res) {
      var options = {
      root: path.join(__dirname, 'uploads'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
  
    var fileName = req.params.fileName
    res.sendFile(fileName, options, function (err) {
      if (err) {
        //res.json("pas d'image")
      } else {
        console.log('Sent:', fileName)
      }
    })
  });
    
  
  app.get('/getAllForum', async (req,res)=> {
      try{
          const forum = await Forum.find();
          res.json (forum);
      }catch (err) {
          res.json ({message: err});
      }
  });
  
  app.get('/:forumid' , async (req, res)=>{
      
      try{
      const forum = await Forum.findById(req.params.forumid);
          res.json(forum);
      }catch (err)
         { res.json ({ message:err}); }
  });
  
  app.delete('/delete/:DeleteForum', async (req, res)=> {
  
      try{
          const removedForum = await Forum.remove({_id : req.params.DeleteForum});
          res.json(removedForum)
          console.log("deleted")
  
      }catch (err){
          res.json({message : err})
      }
  });
  
  app.patch('/modify/:UpdateForumid', async (req,res)=> {
  
      try{
          const UpdateForumid = await Forum.updateOne(
              { _id: req.params.UpdateForumid},
              {$set: {titre: req.body.titre}},
              {$set: {description: req.body.description}},
              {$set: {image: req.body.image}}
          );
          res.json(UpdateForumid);
  
      }catch (err){
          res.json({message:err});
      }
  });
  
  /*************************************Publication******************************************/
  app.post('/Ppublication', async (req,res)=> {
      const publication = new Publication ({
          titre: req.body.titre,
          idforum: req.body.idforum,
          username: req.body.username
      });
      try {
         // forum.publications.push(forum._id);
          const savedPublication = await publication.save();
          res.json(savedPublication);
      } catch (err) {
          res.json ({message: err});
      }
  });
  
  app.get('/getAllPublication', async (req,res)=> {
      try{
          const publication = await Publication.find();
          res.json (publication);
      }catch (err) {
          res.json ({message: err});
      }
  });
  
  app.get('/:publicationid' , async (req, res)=>{
      
      try{
      const publication = await Publication.findById(req.params.publicationid);
          res.json(forum);
      }catch (err)
         { res.json ({ message:err}); }
  });
  app.get('/:publicationid/publication' , async (req, res)=>{
      
      
      const forum = await Forum.findOne( {_id: req.params.publicationid});
      
      res.send(forum);
  });
  app.post('/getcommentsByForum' , async (req,res) => {
  var forumId = req.body.forumId;
  await Publication.find({idforum:forumId},function(err,formus){
      if (err) {
        res.send('Erreur');
      }
      res.json(formus);
    })
})
  

app.listen(3030 , () => console.log("server running perfectly in local"));


//request({
   // url : 'data'+':image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACCklEQVRYR+2ZS0sCURiG39NlkUp00aymUugHRBtrVnaBoKBFC/+ef0BoE0QuKhPEMkKKWmREGo7mpQuitiicOBMTZUfRsWmOMAPDwMx3eeb9zpnLd4gsyzIYW6lURiaTQzr9oOwNzFiuLZ0jhGBqalzZp6cnYLVamH6kHrBcruLo6AT5/GNLif7KaGxsFF7vAmy2n6A/AFMpCQcH0b/KqSnOyooIl0v48v0CTCYlHB4aC6dSLS+LcLs/IRVAWtZAYFfTHevl5PNtKOVWAHd29lEsPuuVS1Ncu30Ym5urIC8vJXl7O6gpiN5OPt86yOVlQo7FzvXOpSm+xzMHEgyGZUnKaQqgt5MgOEH8/gDzQa138lbjm4CtKtXIzlTQVJClwOysC6I4j/7+vl+X397eEY3GcXubgmpHjdRz7SqqaQw2A6QA1eorwuFTWCwDyo0YBlifWAXv7e3BxcU16Ecvl4AqOD0aCsgagxQqkbhDJHLG7xis1Wp8lpiqt7W1hqGhQWSzedzcpIwtMWt2cgXYaAxyU2IWoAoXj18ZN0nafRt0Yq/pTdJJwnZ9TcB2Fau3NxXsWMG9vbBM22w8bpOTzi74cee+9cF986gr2m90gnDdwFRnMA+Q37urlIvZRA+FjlEoPP3rk8fhGMHS0mLzJvp3okqlivv7rLIEIUn6LEMIwucyxMxM42WID3xZj+R6vcWDAAAAAElFTkSuQmCC',
    //make the returned body a Buffer
   // encoding : null
//}, function(error, response, body) {

    //will be true, body is Buffer( http://nodejs.org/api/buffer.html )
   // console.log(body instanceof Buffer);

    //do what you want with body
    //like writing the buffer to a file
  //  fs.writeFile('test.png', body, {
     //   encoding : null
   // }, function(err) {

     //   if (err)
      //      throw err;
      //  console.log('It\'s saved!');
   // });

//});

//fs.appendFile('message.txt', 'data to append', function (err) {
  //  if (err) throw err;
  //  console.log('Saved!');
 // });
//var robot = require("robotjs");
//robot.keyTap("f12");m
//robot.keyTap(["ctrl","shift","m"]);
//var ks = require('node-key-sender');
//ks.sendKey('f12');
//function function2() {
  //  ks.sendCombination(['control', 'shift', 'm']);
//}
//setTimeout(function2, 10000);

/*var htmlToJson = require('html-to-json'),
fs = require('fs'),
dir = require('node-dir'),
results = [],
source = './html',
jsonFN = './report.json';

 
// using the readFiles method in node-dir
dir.readFiles(source,
 
    // a function to call for each file in the path
    function (err, content, fileName, next) {
 
    // if an error happens log it
    if (err) {
 
        console.log(err);
    }
 
    // log current filename
    console.log(fileName);
 
    // using html-to-jsons parse method
    htmlToJson.parse(content, {
 
        // include the filename
        fn: fileName,
 
        // get the h1 tag in my post
        title: function (doc) {
 
            return doc.find('title').text().replace(/\n/g, '').trim();
 
        },
 
        // getting word count
        wc: function (doc) {
 
            // finding word count by getting text of all p elements
            return doc.find('p').text().split(' ').length;
 
        }
 
    }).then(function (result) {
 
        // log the result
        results.push(result);
 
    })
 
    next();
 
}, function () {
 
    // write out a json file
    fs.writeFile(jsonFN, JSON.stringify(results), 'utf-8');
 
});*/