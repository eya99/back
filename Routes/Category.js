const router = require("express").Router();
const Category = require("../Models/Category");








router.post('/deleteCategory', async (req, res) => {
await Type.findOneAndRemove(
   { 
      name : req.body.name
   }, {useFindAndModify: false}
).then(result => {

});
  
  
  
  });

router.post('/addCategory' , async (req,res) => {

   const category = new Category({   
    name: req.body.name,
    
   });
   try{
     const saveedCategory = await category.save();
     res.send(saveedCategory);
   }catch(err){
res.status(400).send(err);
   }
})





   
router.get('/getCategories' , async (req,res) => {
    await Category.find({},function(err,categories){
        if (err) {
          res.send('Erreur');
        }
        res.json(categories);
      })
})





 



module.exports = router;