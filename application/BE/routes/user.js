const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.post("/login", (req, res, next) => {
      console.log(req.body)
    // 우리가 사전 정의한 위 예외사항에 걸리지 않는다면, 드디어 passport로 로그인할 수 있다.
    return req.login(req.body, async (loginErr) => {
      if (loginErr) {
        // passport 측에서 발생하는 오류 - 웬만해서는 거의 겪어보기 힘들지만, 혹시 모르니 분기처리
        console.error(loginErr);
        return next(loginErr);
      }
      // ✅ 모든 예외사항을 통과함!! 드디어 로그인에 성공했기에 클라이언트에 사용자 정보를 json으로 넘겨주기!
      // 이 user는 saga에서 호출한 logInAPI의 반환값이 되고, 이어서 LOG_IN_SUCCESS 액션의 데이터가 되며,
      // reducer에서는 action.data가 된다. 이 프로젝트에서는 reducer의 user.me에 데이터가 들어가게 된다.
      // 기존 user에는 password는 들어있으면서 꼭 필요한 기타 정보가 없으므로, 완전한 유저 정보를 다시 로드.
      const fullUserWithoutPassword = await User.findOne({
        where: { identity : req.body.id, password: req.body.password },
        attributes: {
        exclude: ["password"],
        },
      });
      if(fullUserWithoutPassword==null){return res.status(404).send("ID나 비밀번호가 틀렸습니다.")}
      return res.status(200).json(fullUserWithoutPassword);
    });
});

router.post("/", async (req, res, next) => {
  console.log(req.body)
  // POST /post
  try {
    const exUser = await User.findOne({ where: { identity: req.body.id } }); // 기존 유저가 없다면 null 반환
    if (exUser) {
      // 요청과 응답은 헤더(상태, 용량, 시간, 쿠키)와 바디(데이터)로 구성되어 있다.
      // 4xx : 클라이언트의 잘못된 요청, 5xx : 서버의 잘못된 처리
      return res.status(403).send("이미 사용중인 아이디입니다."); // return 필수(response 중복 방지)
    }
    // const hashedPassword = await bcrypt.hash(req.body.password, 12); // 10~13이 1초 정도로 적절
    await User.create({
      identity: req.body.id,
      name: req.body.name,
      password: req.body.password,
      isMaker: req.body.isMaker
    });
    res.status(201).json("ok"); // 200 : 성공함, 201 : 잘 생성됨(더 구체적인 의미).
  } catch (error) {
    console.error(error);
    next(error); // next로 넘기는 에러는 status 500
  }
});
module.exports = router;
