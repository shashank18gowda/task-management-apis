import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import { send, setErrResMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import inittaskModel from "../../model/taskModel.js";
import { ISACTIVE } from "../../config/constants.js";

const router = Router();

export default router.get(
  "/",
  // authenticate,
  async (req, res) => {
    try {
      const taskModel = await inittaskModel();

      let { task_id, status, priority,sortBy } = req.query;

      let query = {
        //  user_id: req.user.id,
        isactive: ISACTIVE.ACTIVE,
      };

      let order = [];
      task_id ? (query.task_id = task_id) : "";
      status ? (query.status = status) : "";
      priority ? (query.priority = priority) : "";
      sortBy == 1
        ? order.push(["priority", "ASC"])
        : order.push(["createdAt", "DESC"]);


        console.log(order);
        
      let taskData = await taskModel.findAll({
        where: query,
        attributes: [
          "task_id",
          "title",
          "description",
          "priority",
          "status",
          "createdAt",
        ],
        order: order,
      });

      if (taskData.length == 0) {
        return send(res, setErrResMsg(RESPONSE.NOT_FOUND, "Tasks"));
      }

      return send(res, RESPONSE.SUCCESS, taskData);
    } catch (error) {
      console.log("list tasks", error);
      return send(res, RESPONSE.UNKNOWN_ERR);
    }
  }
);
