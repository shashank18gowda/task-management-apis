import { DataTypes } from "sequelize";
import connectDB from "../helper/dbConnection.js";

const userModel = {
  user_id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isactive: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
};

let user = null;
const inituserModel = async () => {
  try {
    if (user) return user;
    const sequelize = await connectDB();
    user = sequelize.define("usermodel", userModel, {
      freezeTableName: true,
    });

    await user.sync({ alter: true });
    return user;
  } catch (err) {
    console.log("user model", err.message);
  }
};

export default inituserModel;
