const express = require("express");
const { Comment} = require("../models");
const history = require("../dummy/history.json")
const router = express.Router();

router.post("/write", async (req, res, next) => {
  console.log(req.body)
  // POST /post
  try {
    await Comment.create({
      content: req.body.content,
      imageSrc: req.body.imageSrc,
    });
    res.status(201).json("ok"); // 200 : 성공함, 201 : 잘 생성됨(더 구체적인 의미).
  } catch (error) {
    console.error(error);
    next(error); // next로 넘기는 에러는 status 500
  }
});

module.exports = router;
