import login from "./src/controllers/auth/login.js";
import register from "./src/controllers/auth/register.js";
import createTask from "./src/controllers/manageTask/createTask.js";
import deleteTask from "./src/controllers/manageTask/deleteTask.js";
import listTask from "./src/controllers/manageTask/listTask.js";
import singleTask from "./src/controllers/manageTask/singleTask.js";
import updateTask from "./src/controllers/manageTask/updateTask.js";

export const router = (app) => {
  app.use("/api/users/register", register);
  app.use("/api/users/login", login);

  //manage task
  app.use("/api/tasks/create", createTask);
  app.use("/api/tasks/list", listTask);
  app.use("/api/tasks/single", singleTask);
  app.use("/api/tasks/update", updateTask);
  app.use("/api/tasks/delete", deleteTask);
};
