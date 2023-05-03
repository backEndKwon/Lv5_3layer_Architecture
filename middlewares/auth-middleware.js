const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = async (req, res, next) => {
  try {
    // 1-0) 로그인할때 발급받은 cookie가져오기
    const { authorization } = req.cookies;
    // 1-1) 전달 받은 쿠키가 없을경우
    if (!authorization) {
      return res
        .status(403)
        .json({ errorMessage: "로그인이 필요한 기능입니다." });
    }

    // 1-2) 가져온 cookie 분해
    const [tokenType, token] = authorization.split(" ");

    // 1-3) 분해된 cookie로 유효성 검사
    if (tokenType !== "Bearer") {
      return res
        .statuts(401)
        .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    }
    const decodedToken = jwt.verify(token, "secret-key");
    const userId = decodedToken.userId;
    const user = await Users.findOne({ where: { userId: userId } });

    if (!user) {
      res.clearCookie("authorization"); //인증 실패시 쿠키삭제
      return res
        .status(401)
        .json({ errorMessage: "토큰에 해당하는 사용자가 존재하지 않습니다." });
    }
    res.locals.user = user;
    next();
    
  } catch (err) {
    res.clearCookie("authorization");
    return res.status(401).json({ errorMessage: "비정상적인 접근입니다." });
  }
};
