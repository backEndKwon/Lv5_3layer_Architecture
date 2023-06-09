//연결고리
"use strict";
const Sequelize = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class Posts extends Model {
    static associate(models) {
      //user와 1:N관계
      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "UserId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Likes, {
        sourceKey: "postId",
        foreignKey: "PostId",
      });
      this.hasMany(models.Comments, {
        sourceKey: "postId",
        foreignKey: "PostId",
      });
    }
  }

  Posts.init(
    {
      postId: {
        allowNull: false, // NOT NULL
        autoIncrement: true, // AUTO_INCREMENT
        primaryKey: true, // Primary Key (기본키)
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false, // NOT NULL
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false, // NOT NULL
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue:0
      }
    },
    {
      sequelize,
      modelName: "Posts",
      timestamps : true
    }
  );
  return Posts;
};
