const router = require("express").Router();
const Tables = require("../Models/Tables");
const mongoose = require("mongoose");


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer')
var transporter = mailer.createTransport({
    service: 'gmail',
  
    secure : false,
    auth: {
        user:'aya.hawel@esprit.tn',
        pass:'193JFT1839eya'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
})






//requete insert
router.post('/test', async (req, res) => {

    const nomTable=req.body.nomTable;

     const TableExist =   await Tables.findOne({ nomTable: req.body.nomTable });
    // const emailExist = await nomTable.findOne({ email: req.body.email });
  
    // Object.keys(req.body).forEach(function(key){ 
    // console.log(key)  
    
    // });
    if(!TableExist){
        return res.status(404).json({ message: "no table found" })
    }
    else{
        const mongoose = require("mongoose");

        const Job = require("../"+req.body.nomTable);
    
        Job.create(req.body)
        .then(records => console.log('created records', JSON.stringify(records, null, 2)));
        nomTable.save(records)
        return res.status(200).json(records)
    }
        
    
});






   async function getUser(req, res, next) {

 const Table=req.body.nomTable;
    const nomTable = require("../"+req.body.nomTable);

    // console.log(nomTable)   
     try {
        //  console.log(req.body._id)
        
      table = await nomTable.findById(req.params.id)
    //    console.log(table)
      if (table == null)
        return res.status(404).json({ message: "no data" })
  
  
    }
    catch (err) {
      return res.status(500).json({ message: err.message })
  
    }
  
    res.table = table
    next()
  }
  

router.patch('/:id', getUser, (req, res) => {
//   console.log(req.body);
    if (req.body != null) {
        // res.table = req.body
nomTable=req.body.nomTable
// console.log(res.table)
        
        const Job = require("../"+req.body.nomTable);
        if(req.body!=null)
        Job.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
        .then(function (success) {
          res.json();
        })
        .catch(function (error) {
            res.status(404).send(err);
        });
  
    // Job.update(req.body)
    // .then(records => console.log('created records', JSON.stringify(records, null, 2)));
    // res.table.save(records).then((updateduser) => {
    //     res.json(  updateduser )
  
    //   })
  
    // nomTable.save(records)  
    }
  
  
  
    
  
  
  })


//delete
router.post('/delete/:id', (req, res) => {
    //   console.log(req.body);
    nomTable=req.body.nomTable
    // console.log(res.table)
            
            const table = require("../"+req.body.nomTable);
     table.findOneAndDelete({ _id: req.params.id }).then(result => {
if(result==null){

    return res.status(404).json({ message: "no data" })

} else{
    return res.status(200).json({ message: "data deleted" })

}
    });

  
    
      
      
      })

     

module.exports = router;