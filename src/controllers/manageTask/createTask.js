import { Router } from "express";
const router = Router();
import inittaskModel from "../../model/taskModel.js";
import Joi from "joi";

export default router.post("/", async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    const taskModel = await inittaskModel();
    if (!title || title === undefined) {
      Joi.string().required();
      return res.status(400).json({
        success: false,
        message: error.details[0].message, // Joi gives ready-made message
      });
    }

    // await taskModel.create({ ...req.body, image, resume });

    return send(res, RESPONSE.SUCCESS);
    // });
  } catch (error) {
    console.log("create task", error);
  }
});
