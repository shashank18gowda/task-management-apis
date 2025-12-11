import { Router } from "express";
const router = Router();
import { send, setErrResMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import authenticate from "../../middlewares/authenticate.js";
import inittaskModel from "../../model/taskModel.js";
import { ISACTIVE } from "../../config/constants.js";

export default router.delete("/", authenticate, async (req, res) => {
  try {
    let task_id = req.query.task_id;

    if (!task_id || task_id == undefined) {
      return send(res, setErrResMsg(RESPONSE.REQUIRED, "task_id"));
    }

    let taskModel = await inittaskModel();

    let taskData = await taskModel.findOne({
      where: {
        task_id,
        isactive: ISACTIVE.ACTIVE,
      },
    });
    if (!taskData) {
      return send(res, setErrResMsg(RESPONSE.NOT_FOUND, "Tasks"));
    }

    await taskModel.update(
      {
        isactive: ISACTIVE.INACTIVE,
      },
      {
        where: { task_id: task_id, isactive: ISACTIVE.ACTIVE },
      }
    );

    return send(res, RESPONSE.SUCCESS);
  } catch (err) {
    console.log("update task: ", err);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
