const express = require("express");
const { getById } = require("./userDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

async function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  const user = await getById(id);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ message: "invalid user id" });
  }
}

function validateUser(req, res, next) {
  // do your magic!
  const newUser = req.body;
  if (newUser) {
    if (newUser.name) {
      next();
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const newPost = req.body;
  if (newPost) {
    if (newPost.text) {
      next();
    } else {
      res.status(400).json({ message: "missing required text field" });
    }
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
