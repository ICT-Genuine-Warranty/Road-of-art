const express = require("express");
const { Mempool, Comment } = require("../models");
const router = express.Router();

router.post("/sell", async (req, res, next) => {
  console.log(req.body)
  // POST /post
  try {
    await Mempool.create({
      itemId: req.body.itemId,
      platform: req.body.platform,
      comment: req.body.comment,
      imgsrc: req.body.imgSrc,
      price: req.body.price,
      buyerId: req.body.buyerId,
      type: req.body.type
    });
    res.status(201).json("ok"); // 200 : 성공함, 201 : 잘 생성됨(더 구체적인 의미).
  } catch (error) {
    console.error(error);
    next(error); // next로 넘기는 에러는 status 500
  }
});

router.post("/get", async (req, res, next) => {
  console.log(req.body)
  // POST /post
  try {
    const result = await Mempool.findOne({ where: { buyerId: req.body.userId, itemId: req.body.itemId } });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    next(error); // next로 넘기는 에러는 status 500
  }
});

router.post("/maketx", async (req, res, next) => {
  // POST /post
  try {
    const seller = await Comment.create({
      content: req.body.sellerComment,
      imageSrc: req.body.sellerImg
    });
    const sellerCommentId = seller.id
    const buyer = await Comment.create({
      content: req.body.buyerComment,
      imageSrc: req.body.buyerImg
    });
    const buyerCommentId = buyer.id

    const tradeInfo = {
      tradeCode: req.body.tradeCode,
      itemCode: req.body.itemCode,
      platform: req.body.platform,
      price: req.body.price,
      traded: req.body.traded,
      type: req.body.type,
      sellerId: req.body.sellerId,
      buyerId: req.body.buyerId,
      comments: {
        sellerComment: {
          ownerId: req.body.sellerId,
          commentURI: sellerCommentId
        },
        buyerComment: {
          ownerId: req.body.buyerId,
          commentURI: buyerCommentId
        }
      }
    }
    var sdk = require("../hyperledgerSDK/getHistory");
    await sdk.transfer(tradeInfo.tradeCode, tradeInfo.itemCode, tradeInfo.platform, tradeInfo.traded, tradeInfo.type, tradeInfo.sellerId, tradeInfo.buyerId, tradeInfo.comments.sellerComment, tradeInfo.comments.buyerComment);



    await Mempool.destroy({ where: { buyerId: req.body.sellerIdentity, itemId: req.body.itemCode } });

    res.status(201).json(tradeInfo); // 200 : 성공함, 201 : 잘 생성됨(더 구체적인 의미).
  } catch (error) {
    console.error(error);
    next(error); // next로 넘기는 에러는 status 500
  }
});
module.exports = router;
