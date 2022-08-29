const express = require("express");
const { User, Comment } = require("../models");
const router = express.Router();


const TYPE = ["", "제작", "유통", "공식판매", "중고거래"];
const PLATFORM = ["", "자체유통", "쿠팡", "옥션", "번개장터", "당근마켓", "크림", "중고나라", "네이버"]

router.post("/", async (req, res, next) => {
      var sdk = require("../hyperledgerSDK/getHistory");
      const history = await sdk.getHistory(req.body.itemCode);
      console.log("gethis")
      console.log(history[0].comments)
      const response = await Promise.all(history.map(async (el) => {
            const seller = await User.findOne({
                  where: { id: el.sellerId },
            }).catch((err) => null);;

            const buyer = await User.findOne({
                  where: { id: el.buyerId },
            }).catch((err) => null);;

            console.log(el.comments.buyersComment)
            const buyersComment = await Comment.findOne({
                  where: { id: el.comments.buyersComment.CommentURI },
            }).catch((err) => null);

            const sellersComment = await Comment.findOne({
                  where: { id: el.comments.sellersComment.CommentURI },
            }).catch((err) => null);;

            const result = {
                  tradeCode: el.tradeCode,
                  itemCode: el.itemCode,
                  platform: PLATFORM[el.platform],
                  traded: el.traded,
                  type: TYPE[el.type],
                  seller: seller.name,
                  buyer: buyer.name,
                  comments: {
                        sellersComment: {
                              owner: seller.name,
                              content: sellersComment.content,
                              imgSrc: sellersComment.imageSrc,
                        },
                        buyersComment: {
                              owner: buyer.name,
                              content: buyersComment.content,
                              imgSrc: buyersComment.imageSrc,
                        }
                  }
            }
            return result;

      }))
      console.log("result")
      console.log(response)
      return res.status(200).json(response);
});
module.exports = router;
