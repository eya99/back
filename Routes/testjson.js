const express = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();

const bodyParser = require("body-parser");
const fs= require('fs');


const Tables = require('../Models/Tables')

const multer = require('multer');
var upload = multer({ dest: 'images/' })


var request = require('request');


  
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.text +' ' +file.fieldname + '-' + Date.now()+'.json')
    var result;
 
  

  }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype === 'image/jpg'|| file.mimetype === 'application/json') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
var upload = multer({ storage: storage, fileFilter: fileFilter })
router.post('/test', upload.single("text"), function (req, res, next) {
console.log("IMAGE UPLOADING...")
res.setHeader('Access-Control-Allow-Origin','*');
res.json({"ok": "suucess"});

})
//Get file json 
router.get('/test', function (req, res, next) {
    data='';
    console.log("IMAGE UPLOADING...")
  
    let rawdata = fs.readFileSync('images/client.json');
    let student = JSON.parse(rawdata);
  
    // console.log(student.dbName)
    
  
    for(var i = 0; i < student.tables.length; i++) {
  this.data=""
  
  
   for(var j = 0; j < student.tables[i].columns.length; j++) {
  // console.log( student.tables[i].columns[j].name)
  this.data = 
  
  student.tables[i].columns[j].name+' : { '+'\n'+
  
  '  ' + 'type :'+student.tables[i].columns[j].datatype+','+'\n'+
  
  '  ' + 'max:'+student.tables[i].columns[j].taille+','+'\n'+
  '  ' + 'required:'+student.tables[i].columns[j].required+','+'\n'+
  '},'+'\n'+this.data
   }
  // console.log(data)
  let newFile = student.tables[i].name
  const  nomt=' \"'+student.tables[i].name+'\"'
  
  fs.writeFileSync('./'+student.tables[i].name+'.js','const mongoose = require("mongoose");\n'+
  'const' +' '+student.tables[i].name+'Schema = new mongoose.Schema({'+ '\n'+ data +'})'+'\n'+
  
  'module.exports =mongoose.model'+'('+'\"'+newFile+'\",'+student.tables[i].name+'Schema);'
  );
  // this.data=""
    console.log(student.tables[i].name);
      const tables = new Tables({   
        nomTable:student.tables[i].name,
   
  });
  console.log(tables)
  
  
  const nomTable = student.tables[i].name
  
  
  
  Tables.findOne({ nomTable : nomTable})
  .then(data => {
  console.log(data)
  if (data!=null){
  
       res.send({ message: "exist "  });
  }
     else 
     tables.save();
     res.send("saved ");
        })
   .catch(err => {
     res.send({ message: "not find " });
  });  
    
  
  
  
  
  }
  
  
  
  
    
    })


    module.exports = router;
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