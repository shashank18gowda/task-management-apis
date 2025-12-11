import { Router } from "express";
const router = Router();
import inittaskModel from "../../model/taskModel.js";
import { STATUS } from "../../config/constants.js";
import { RESPONSE } from "../../config/global.js";
import authenticate from "../../middlewares/authenticate.js";
import { send, setErrResMsg } from "../../helper/responseHelper.js";

export default router.post(
  "/",
  authenticate,
  async (req, res) => {
    try {
      const { title, description, priority } = req.body || {};

      const taskModel = await inittaskModel();

      if (!title || title === undefined) {
        return send(res, setErrResMsg(RESPONSE.REQUIRED, "title"));
      }
      if (!priority || priority === undefined) {
        return send(res, setErrResMsg(RESPONSE.REQUIRED, "priority"));
      }

      await taskModel.create({
        ...req.body,
        status: STATUS.PENDING,
        user_id: req.user.id,
      });

      return send(res, RESPONSE.SUCCESS);
    } catch (error) {
      console.log("create task", error);
      return send(res, RESPONSE.UNKNOWN_ERR);
    }
  }
);
