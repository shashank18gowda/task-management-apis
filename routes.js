import login from "./src/controllers/auth/login.js";
import register from "./src/controllers/auth/register.js";
import createTask from "./src/controllers/manageTask/createTask.js";
import listTask from "./src/controllers/manageTask/listTask.js";

export const router = (app) => {
  app.use("/api/users/register", register);
  app.use("/api/users/login", login);

  //manage task
  app.use("/api/tasks/create", createTask);
  app.use("/api/tasks/list", listTask);
};
