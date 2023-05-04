const UserService = require("../services/users.service");
const jwt = require("jsonwebtoken");

class UserController {
  userService = new UserService();
  signup = async (req, res) => {
    const { nickname, password, confirm } = req.body;
    try {
      //패스워드 길이확인
      if (password.length < 4) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드 형식이 일치하지 않음" });
      }
      //패스워드 정확성 확인
      if (password !== confirm) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드가 일치하지 않음" });
      }
      //닉네임 형식확인
      const checkNickname = /^[a-zA-Z0-9]{3,}$/.test(nickname);
      if (!checkNickname) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임 형식이 올바르지 않음" });
      }
      //닉네임 중복확인
      const isExistUser = await this.userService.findOneUser(nickname);
      if (isExistUser) {
        return res.status(412).json({ errorMessage: "중복된 닉네임" });
      }
      //패스워드에 닉네임 포함확인
      if (password.includes(nickname)) {
        return res
          .status(412)
          .json({ errorMessage: "패스워드에 닉네임이 포함됨" });
      }
      const signupData = await this.userService.signup(nickname, password);
      res.status(201).json(signupData);
    } catch (err) {
      return res.status(400).json({ errorMessage: "실패!" });
    }
  };

  login = async (req, res) => {
    const { nickname, password } = req.body;
    try {
      const isExistUser = await this.userService.findOneUser(nickname);
      if (!isExistUser || password !== isExistUser.password) {
        return res
          .status(412)
          .json({ errorMessage: "닉네임 또는 패스워드 확인바람" });
      }
      let expires = new Date();
      expires.setMinutes(expires.getMinutes() + 600);
      const loginData = await this.userService.login(nickname, password);
      res.cookie("authorization", `Bearer ${loginData.token}`, {
        expires: expires,
      });
      res.status(200).json(loginData);
      console.log({ message: `${nickname}님 로그인성공!` });
    } catch (err) {
      return res.status(400).json({ errorMessage: "로그인 실패!" });
    }
  };
}

module.exports = UserController;
