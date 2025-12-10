import createTask from "./src/controllers/manageTask/createTask.js";

export const router = (app) => {
  app.use("/api/task/create", createTask);
};
