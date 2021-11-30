const { User, Campaign, Character, Blog, Comment, UserCampaign, Invite, Inventory, Feature, Proficiency, Spell } = require("../../models");
const tokenAuth = require("../../middleware/tokenAuth");
const router = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// The `http://localhost:3001/api/user` endpoint

// CREATE A NEW USER
router.post("/signup", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((foundUser)=>{
    if(foundUser) {
      res.status(403).send("user already exists please login")
    } else {
      User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email.toLowerCase(),
        image_content: 'https://avatars.dicebear.com/api/pixel-art/sdfsdfsdfsdfsdfs.svg',
      })
        .then((newUser) => {
          res.json(newUser);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ err });
        });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ err });
  });
});

// LOGIN USER - GET TOKEN
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
  .then((foundUser) => {
    if (!foundUser) {
      res.status(401).send("incorrect email or password");
    } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      const token = jwt.sign(
        {
          email: foundUser.email,
          id: foundUser.id,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.json({
        token: token,
        user: foundUser,
      });
    } else {
      res.status(401).send("incorrect email or password");
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err });
  });
});

// // GET ALL USERS 
router.get("/all", (req, res) => {
  User.findAll({
    include: [Campaign, Character, Blog, Comment],
  })
    .then((dbUsers) => {
      if (dbUsers.length) {
        res.json(dbUsers);
      } else {
        res.status(404).json({ err: "No users found!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: "an error occurred" });
    });
});

// FIND A SINGLE USER USING LOGIN CREDENTIALS - FIND SELF FUNCTION
router.get("/", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id, {
      include: [Campaign, Character, Blog, Comment, Invite],
    });
    // const campaignData = await Campaign.findAll({
    //   where: {
    //     gm_id: req.user.id
    //   }
    // });
    if (!userData) {
      res.status(404).json({ message: "No User found" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// FIND A SINGLE USER USING ID
router.get("/id:id", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {id:req.params.id},
      include: [Campaign, Character, Blog, Comment, Invite],
    });
    if (!userData) {
      res.status(404).json({ message: "No User found with that ID!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND A SINGLE USER USING EMAIL
router.get("/email:email", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {email:req.params.email},
      include: [Campaign, Character, Blog, Comment, Invite],
    });
    if (!userData) {
      res.status(404).json({ message: "No User found with that email!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND A SINGLE USER PROFILE USING LOGIN CREDENTIALS
router.get("/profile", tokenAuth, (req, res) => {
  User.findByPk(req.user.id).then((foundUser) => {
    res.status(200).json(foundUser);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: "an error occurred" });
  });
});

// FIND A SINGLE USER USING ID - GAME 
router.get("/game:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [Campaign, Character ],
    });
    const campaignData = await Campaign.findAll({ //TODO: MAY ALSO CAUSE ISSUES IF USED
      where: {
        gm_id: req.params.id
      }
    });
    if (!userData) {
      res.status(404).json({ message: "No User found with that id!" });
      return;
    }
    res.status(200).json([userData, campaignData]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND A SINGLE USER USING ID - FORUM
router.get("/forum:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [Blog, Comment],
    });
    if (!userData) {
      res.status(404).json({ message: "No User found with that id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE USER
router.put("/update", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id);
    if (!userData) {
      res.status(404).json({ message: "No User found with that id!" });
      return;
    } else if (req.body.username) {
      const updateUser = await User.update({
        username: req.body.username,
      }, {
        where: { id: req.user.id },
      });
      res.status(200).json(updateUser);
    } else if (req.body.email) {
      const updateUser = await User.update({
        email: req.body.email,
      }, {
        where: { id: req.user.id },
      });
      res.status(200).json(updateUser);
    } else if (req.body.password) {
      const newPassword = await bcrypt.hash(req.body.password,10)
      const updateUser = await User.update({
          password:newPassword,
      }, {
          where: {id:req.user.id}
      })
      res.status(200).json(updateUser);
    } else if (req.body.image_content) {
      const updateUser = await User.update({
        image_content: req.body.image_content,
      }, {
        where: { id: req.user.id },
      });
      res.status(200).json(updateUser);
      return;
    } else {
      res.status(401).json({message:"Something went Wrong"})
    }
  } catch (err) {
    res.status(500).json({ err: "an error occurred" });
  }
});

// DELETE A USER USING LOGIN CREDENTIALS
router.delete("/", tokenAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.user.id,
    },
  })
  .then((delUser) => {
    if (delUser) {
      res.json(delUser);
    } else {
      res.status(404).json({ err: "no user found" });
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ err: "an error occurred" });
  });
});


module.exports = router;
