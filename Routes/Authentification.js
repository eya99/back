const router = require("express").Router();
const User = require("../Models/User");
const Setting = require("../Models/setting");
const htmlCode = require("./../Views/forgotMDP");

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




router.post('/verifEmail', async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        res.send({ message: 'email exist' });
    } else {
        res.send({ message: 'good' });
    }
})

router.post('/register', async (req, res) => {

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        console.log("hi")

        return res.status(400).send({ message: 'email exist' });
    }
    console.log(req.body.email)
    console.log("hiii")
console.log(req.body.prenom)
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        name:req.body.name,
        prenom:req.body.prenom,

        email: req.body.email,
        password: req.body.password,
        roles: req.body.roles
    });
console.log(user)
    try {

        const newUser = await user.save()
        if (newUser) {
          sendmail(user.email);
          res.status(201).json({ user: newUser })
        }
    
    
    
      } catch (err) {
        if (err.code === 11000) {
          res.json({ isemail: true });
        }
    }
})
function sendmail(email) {
    code = Math.floor(Math.random() * 9999) + 111;
  console.log("code:",code)
    
      

    var mailOptions = {
      from: 'aya.hawel@esprit.tn',
      to: email,
      subject: 'Sending verification email',
      text: 'to verif your email enter ' + code
      
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  
    });
  
  }
  function sendmail2(email) {
    
      

    var mailOptions = {
      from: 'aya.hawel@esprit.tn',
      to: email,
      subject: 'Sending verification email',
      text: 'your account is deleted please contact me for more information ' 
      
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  
    });
  
  }

router.post("/socauth", (req, res) => {
    try {
      let newUser =new User ({
        name: req.body.nom,
        email: req.body.email,
        prenom: req.body.prenom,
        image: req.body.image,
        verified: true,
        roles: "Client",

      })
      User.findOne({ email: newUser.email }).then((sss) => {
      user=sss
      console.log(user)
  
      if(user){
    const token = jwt.sign({ user }, "oussamaridene",
    {
        expiresIn: 86400
    });
     res.status(200).send({
    _id: user._id,
    email: user.email,
    roles: user.roles,
    accessToken: token
});
  }else{
      
      newUser.save().then((user) => {
        console.log('hello',user)
        compte = user;
        if (compte) {
          let payload = {
            id: compte.id,
            role: compte.roles,
          };
          const token = jwt.sign({ compte }, "oussamaridene",
        {
            expiresIn: 86400
        });
         res.status(200).send({
        _id: user._id,
        email: user.email,
        roles: user.roles,
        accessToken: token
    });
  
      
  
        } else {
          res.status(401);
          res.json({
            error: "UNAUTHORIZED",
          });
        }}
        )}
      })
  
    } catch (err) {
      console.log(err.code)
      if (err.code === 11000) {
        res.json({ created: true });
      }
    }
  });
  router.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    const emailExist = await User.findOne({ email: email });
    if (!emailExist) {
        return res.status(400).send({ message: 'invalid email' });
    }
    const user = await User.findOne({ email: email });
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        return res.status(400).send({ message: 'invalid password' });
    }


    const token = jwt.sign({ user }, "oussamaridene",
        {
            expiresIn: 86400
        });
        console.log(user)
        await res.status(200).send({
        _id: user._id,
        email: user.email,
        roles: user.roles,
        accessToken: token,
        verified:user.verified,
        name:user.name,
        prenom:user.prenom
   

    });

});
router.get('/:id', getUser, (req, res) => {
    console.log("hello",res.user);
    sendmail(res.user.email);
       res.send(res.user);
       
  
   });
   async function getUser(req, res, next) {
    try {
      user = await User.findById(req.params.id)
      if (user == null)
        return res.status(404).json({ message: "no data" })
  
  
    }
    catch (err) {
      return res.status(500).json({ message: err.message })
  
    }
  
    res.user = user
    next()
  }
  
router.post('/resetPasswordMail', async (req, res) => {

console.log(req.body.email)
    const userExist = await User.findOne({ email: req.body.email });
    console.log(userExist)
    if (!userExist) {
        res.status(400).send({ message: 'invalid email' });
    } else {
        const settingExist = await Setting.findOne({ idUser: userExist._id });
        let code = '';
        if (settingExist) {
            code = settingExist.code;
        } else {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 64; i++) {
                code += characters.charAt(Math.floor(Math.random() * 64));
            }
            const setting = new Setting({ idUser: userExist._id, code: code });
            await setting.save();
            console.log(setting)
        }
        var mailOption = {
            from: ' <ayahawel3@gmail.com>',
            to: req.body.email,
            subject: 'Mot de passe oublié',
            text: '',
            html: htmlCode(code)
        }
        console.log(mailOption)
        try {
            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send({ message: 'email sent' })
                }
            })
        } catch (err) {
            res.status(400).send(err);
        }
    }
});
router.patch('/:id', getUser, (req, res) => {
  console.log(req.body);
    if (req.body.nom != null) {
      res.user.nom = req.body.nom
  
    }
    if (req.body.prenom != null) {
      res.user.prenom = req.body.prenom
  
    }
    if (req.body.password != null) {
      res.user.password = req.body.password
  
    } if (req.body.email != null) {
      res.user.email = req.body.email
  
    } if (req.body.code == code) {
  
      res.user.verified = true;
  
    }
    if (req.body.role != null) {
      res.user.role = req.body.role
  
  
    }
    if (req.body.image != null) {
      res.user.image = req.body.image
  
  
    }
    try {
  
      res.user.save().then((updateduser) => {
        res.json(  updateduser )
  
      })
  
  
    }
    catch (err) {
      res.status(400).json({ message: err.message })
  
    }
  
  
  })
  router.delete('/delete/:id/:email', (req, res) => {
    //   console.log(req.body);
    // console.log(res.table)
            let email=req.params.email
            console.log(email) 
            User.findOneAndDelete({ _id: req.params.id }).then(result => {
if(result==null){
    return res.status(404).json({ message: "no data" })

} else{
  sendmail2(req.params.email);
    return res.status(200).json({ message: "data deleted" })


}
    })
  })
router.post('/verifCode/:code', async (req, res) => {
    const setting = await Setting.findOne({ code: req.params.code });
    if (!setting) {
        res.send({ message: 'invalid code' });
    } else {
        res.send(setting);
    }

});
router.post('/disable/:id/:verified', async (req, res) => {
console.log(req.body.id)
console.log(req.params.verified)
  const user = await User.findByIdAndUpdate(req.params.id, { $set: { verified: req.params.verified } });
  if (!user) {
      res.status(400).send({ message: 'User not found' });
  } else {
      res.send(user);
  }
  
});
router.post('/enable/:id/:verified', async (req, res) => {
  console.log(req.body.id)
  console.log(req.params.verified)
    const user = await User.findByIdAndUpdate(req.params.id, { $set: { verified: req.params.verified } });
    if (!user) {
        res.status(400).send({ message: 'User not found' });
    } else {
        res.send(user);
    }
    
  });
router.post('/updatePassword', async (req, res) => {

    const password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.findByIdAndUpdate(req.body.idUser, { $set: { password: password } });
    if (!user) {
        res.status(400).send({ message: 'User not found' });
    } else {
        const deleted = await Setting.findOneAndDelete({ idUser: req.body.idUser });
        res.send(user);
    }
    
});

module.exports = router;