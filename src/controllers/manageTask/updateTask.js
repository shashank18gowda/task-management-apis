import { Router } from "express";
const router = Router();
import { send, setErrResMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import authenticate from "../../middlewares/authenticate.js";
import inittaskModel from "../../model/taskModel.js";

export default router.put("/", authenticate, async (req, res) => {
  try {
    let { task_id, title, description, priority, status } = req.body || {};

    if (!task_id || task_id == undefined) {
      return send(res, setErrResMsg(RESPONSE.REQUIRED, "task_id"));
    }

    let taskModel = await inittaskModel();
    let updates = {};

    if (title && title != undefined) {
      updates.title = title;
    }
    if (description && description != undefined) {
      updates.description = description;
    }
    if (priority && priority != undefined) {
      updates.priority = priority;
    }
    if (status && status != undefined) {
      updates.status = status;
    }

    await taskModel.update(updates, {
      where: { task_id: task_id },
    });

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log("update task: ", err);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
