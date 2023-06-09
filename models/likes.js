//연결고리
"use strict";
const Sequelize = require('sequelize');

const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class Likes extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "UserId",
        onDelete: "CASCADE",
      });
      this.belongsTo(models.Posts, {
        targetKey: "postId",
        foreignKey: "PostId",
        onDelete: "CASCADE",
      });
    }
  }

  Likes.init(
    {
      likeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Likes",
      timestamps : true
    }
  );
  return Likes;
};
