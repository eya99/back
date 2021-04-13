
const { Octokit } = require("@octokit/rest");
const Project = require("../Models/Project");
const { exec } = require("child_process");
const router = require("express").Router();
const fs= require('fs');

router.post('/createproject' , async (req,res) => {
console.log(req.body);
    const project = new Project({   
     name: req.body.name,
     category : req.body.category,
     giturl : "https://github.com/oussemaRidene/" + req.body.name,
     url : "http://localhost:3000/projects/"+ req.body.name,
     createdat : Date.now(),
     userId : req.body.userId
    });
    try{
      const saveedProject =  project.save();
      res.send(saveedProject);
      const octokit = new Octokit({
        auth: "768bacee0951a49b116087fcd2cd377094c076d6",
      });
      octokit.repos.createForAuthenticatedUser({
        name: project.name,
      });
      var cmd = 'cd projects && flutter create '+project.name+' && cd '+project.name+' && git init && git add . && git commit -m "first commit" && git branch -M main && git remote add origin https://github.com/oussemaRidene/'+project.name+'.git && git push -u origin main';
      console.log(cmd);
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
      
      

    }catch(err){
      res.status(400).send(err);
    }
    
 })
 router.post('/project_icon',async(req,res)=>{
   var projectname = req.body.projectname;
   var iconDataUrl = req.body.iconDataUrl;
   fs.mkdirSync('./projects/'+projectname+'/assets')
   console.log('this is project name '+ projectname )
   console.log('this is icondataurl '+ iconDataUrl )
var regex = /^data:.+\/(.+);base64,(.*)$/;

var matches = iconDataUrl.match(regex);
var ext = matches[1];
var dataa = matches[2];
var buffer = Buffer.from(dataa, 'base64');

fs.writeFileSync('./projects/'+projectname+'/assets/icon.' + ext, buffer);
var data = fs.readFileSync('./projects/'+projectname+'/pubspec.yaml').toString().split("\n");
data.splice(33, 0, "  flutter_launcher_icons: '^0.8.0'\nflutter_icons: \n  android: 'launcher_icon' \n  ios: true \n  image_path: 'assets/icon.png'");
var text = data.join("\n");
fs.writeFile('./projects/'+projectname+'/pubspec.yaml', text, function (err) {
  if (err) return console.log(err);
});
 })



 router.get('/getProjects' , async (req,res) => {
  await Project.find({},function(err,projects){
      if (err) {
        res.send('Erreur');
      }
      res.json(projects);
    })
})
router.post('/getProjectsByUser' , async (req,res) => {
  var userId = req.body.userId;
  await Project.find({userId:userId},function(err,projects){
      if (err) {
        res.send('Erreur');
      }
      res.json(projects);
    })
})

 
module.exports = router;



