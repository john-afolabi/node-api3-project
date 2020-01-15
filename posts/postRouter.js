const express = require("express");
const { get, getById, insert, update, remove } = require("./postDb");
const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  get().then(posts => {
    res.status(200).json(posts);
  });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  remove(req.post.id)
    .then(data => {
      res.status(200).json({
        message: `Post with id:${req.post.id} has been deleted succesfully`
      });
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: `Post with id:${req.post.id} cannot be deleted at this time`
      });
    });
});

router.put("/:id", validatePostId, validatePost, (req, res) => {
  // do your magic!
  const postChanges = req.body;
  update(req.post.id, postChanges)
    .then(async data => {
      const updatedPost = await getById(req.post.id);
      res.status(201).json(updatedPost);
    })
    .catch(error => {
      res.status(500).json({
        errorMessage: `Post with id:${req.post.id} cannot be edited at this time`
      });
    });
});

// custom middleware

async function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  const post = await getById(id);
  if (post) {
    req.post = post;
    next();
  } else {
    res.status(404).json({ message: `Post with id:${id} not found` });
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
