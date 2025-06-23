const { postDb } = require("../config/db");
const { DataTypes } = require("sequelize");

const Post = postDb.define("Post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  petId: {
    type: DataTypes.UUID,
    allowNull: false,  
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,  
  },
}, {
  timestamps: true,  
  tableName: 'Posts'  
});

module.exports = Post;
