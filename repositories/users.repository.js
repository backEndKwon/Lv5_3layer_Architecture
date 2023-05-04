const { Users } = require("../models");

class UsersRepository {
  createUser = async (nickname, password) => {
    const createUserData = await Users.create({
      nickname,
      password,
    });
    return createUserData;
  };
  findOneUser = async (nickname) => {
    const findOneData = await Users.findOne({
      where: { nickname: nickname },
    });
    return findOneData;
  };
}

module.exports = UsersRepository;
