const express = require("express");
const router = express.Router();
const { User, Campaign, Character, Blog, Comment, Invite } = require("../../models");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middleware/tokenAuth");
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
        image_content: req.body.image_content,
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

// FIND A SINGLE USER USING LOGIN CREDENTIALS - ALL
router.get("/", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id, {
      include: [Campaign, Character, Blog, Comment, Invite],
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

// FIND A SINGLE USER USING EMAIL
router.get("/:email", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {email:req.params.email},
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

// FIND A SINGLE USER USING LOGIN CREDENTIALS - GAME
router.get("/game", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id, {
      include: [Campaign, Character ],
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

// FIND A SINGLE USER USING LOGIN CREDENTIALS - FORUM
router.get("/forum", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id, {
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


// FIND A SINGLE USER PROFILE USING LOGIN CREDENTIALS
router.get("/profile", tokenAuth, (req, res) => {
  User.findByPk(req.user.id).then((foundUser) => {
    res.json(foundUser);
  });
});

// FIND USER BY ID - AND UPDATE
router.put("/update", tokenAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id);
    if (!userData) {
      res.status(404).json({ message: "No User found with that id!" });
      return;
    }
    const updateUser = await User.update(req.body, {
      where: { id: req.user.id },
      individualHooks: true
    });
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
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
