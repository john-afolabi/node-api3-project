const express = require("express");
const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove
} = require("./userDb");
const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body;
  insert(newUser)
    .then(createdUser => {
      res.status(201).json(createdUser);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The new user could not be added" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "Users cannot be retrieved at this moment" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: `${req.user.name} posts cannot be retrieved at this moment`
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  remove(req.user.id)
    .then(data => {
      res.status(200).json({ message: `${req.user.name} has been deleted` });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: `${req.user.name} cannot be deleted at this moment`
      });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // do your magic!
  update(req.user.id, req.body)
    .then(async data => {
      const updatedUser = await getById(req.user.id);
      res.status(200).json(updatedUser);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: `${req.user.name} cannot be edited at this moment`
      });
    });
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
  if (Object.keys(newUser).length) {
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
  if (Object.keys(newPost).length) {
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
