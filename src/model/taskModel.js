import { DataTypes } from "sequelize";
import connectDB from "../helper/dbConnection.js";
import inituserModel from "./userModel.js";

const taskModel = {
  task_id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isactive: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
};

let task = null;
const inittaskModel = async () => {
  try {
    if (task) return task;
    const sequelize = await connectDB();
    task = sequelize.define("taskmodel", taskModel, {
      freezeTableName: true,
    });

    const user = await inituserModel();
    user.hasMany(task, {
      as: "taskInfo",
      onDelete: "cascade",
      foreignKey: {
        allowNull: false,
        name: "user_id",
      },
      targetKey: "user_id",
    });

    await task.sync({ alter: true });
    return task;
  } catch (err) {
    console.log("task model", err.message);
  }
};

export default inittaskModel;
