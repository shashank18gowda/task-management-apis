import { Router } from "express";
import authenticate from "../../middlewares/authenticate.js";
import { send, setErrResMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import inittaskModel from "../../model/taskModel.js";
import { ISACTIVE } from "../../config/constants.js";

const router = Router();

export default router.get("/:id", authenticate, async (req, res) => {
  try {
    const taskModel = await inittaskModel();

    let task_id = req.params.id;

    let taskData = await taskModel.findOne({
      where: {
        task_id,
        user_id: req.user.id,
        isactive: ISACTIVE.ACTIVE,
      },
      attributes: [
        "task_id",
        "title",
        "description",
        "priority",
        "status",
        "createdAt",
      ],
    });

    if (!taskData) {
      return send(res, setErrResMsg(RESPONSE.NOT_FOUND, "Tasks"));
    }

    return send(res, RESPONSE.SUCCESS, taskData);
  } catch (error) {
    console.log("list tasks", error);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
