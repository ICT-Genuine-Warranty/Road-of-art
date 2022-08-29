const express = require("express");
const { Item,ItemInfo,User } = require("../models");
const history = require("../dummy/history.json")
const router = express.Router();

router.post("/register", async (req, res, next) => {
  console.log(req.body)
  // POST /post
  try {
    await ItemInfo.create({
      name: req.body.name,
      detailedName: req.body.detailedName,
    });
    res.status(201).json("ok"); // 200 : 성공함, 201 : 잘 생성됨(더 구체적인 의미).
  } catch (error) {
    console.error(error);
    next(error); // next로 넘기는 에러는 status 500
  }
});

router.post("/make", async (req, res, next) => {
  console.log(req.body)

  try {
    await Item.create({
      itemId: req.body.itemId,
      maked: req.body.maked,
      tradeNum: req.body.tradeNum,
      firstSeller: req.body.firstSeller,
      owner: req.body.owner,
      imageSrc : req.body.imageSrc,
    });
    res.status(201).json("ok"); // 200 : 성공함, 201 : 잘 생성됨(더 구체적인 의미).
  } catch (error) {
    console.error(error);
    next(error); // next로 넘기는 에러는 status 500
  }
});

router.post("/getInfo",async (req, res, next) => {
    console.log(req.body)
  try {
      const item = await Item.findOne({
        where: { id : req.body.id },
      });
      if(item==null){return res.status(404).send("제품이 존재하지 않습니다.")}
      const itemInfo = await ItemInfo.findOne({
        where: { id : item.itemId },
      });
      if(item==null){return res.status(404).send("제품이 존재하지 않습니다.")}

      var owner = await User.findOne({
        where: { id : item.owner },
      });
      owner = owner.name;

      var seller = await User.findOne({
        where: { id : item.firstSeller },
      });
      seller=seller.name

      const response = {
        itemId: itemInfo.id,
        name: itemInfo.name,
        detailedName: itemInfo.detailedName,
        itemCode: item.id,
        maked: item.maked,
        tradeNum: item.tradeNum,
        firstSeller: seller,
        owner: owner,
        ownerId:item.owner,
        imageSrc: item.imageSrc
      };

      return res.status(200).json(response);
    }catch (error) {
    console.error(error);
    next(error); // next로 넘기는 에러는 status 500
  }

});

router.post("/search", (req, res, next) => {
      return res.status(200).json(history);
});

module.exports = router;
