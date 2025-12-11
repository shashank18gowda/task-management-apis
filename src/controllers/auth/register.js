import { Router } from "express";
const router = Router();
import inituserModel from "../../model/userModel.js";
import { ISACTIVE, STATUS } from "../../config/constants.js";
import { RESPONSE } from "../../config/global.js";
import authenticate from "../../middlewares/authenticate.js";
import { send, setErrResMsg } from "../../helper/responseHelper.js";
import bcrypt from "bcrypt";
export default router.post(
  "/",
  // authenticate,
  async (req, res) => {
    try {
      const { name, email, password } = req.body || {};

      const userModel = await inituserModel();

      if (!name || name === undefined) {
        return send(res, setErrResMsg(RESPONSE.REQUIRED, "name"));
      }
      if (!email || email === undefined) {
        return send(res, setErrResMsg(RESPONSE.REQUIRED, "email"));
      }
      if (!password || password === undefined) {
        return send(res, setErrResMsg(RESPONSE.REQUIRED, "password"));
      }

      const emailPattern = String(email).match(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      );

      if (!emailPattern) {
        return send(res, setErrResMsg(RESPONSE.INVALID, "Email"));
      }

      let emailExists = await userModel.findOne({
        where: {
          isactive: ISACTIVE.ACTIVE,
          email: email,
        },
      });

      if (emailExists) {
        return send(res, setErrResMsg(RESPONSE.ALRDY_EXIST, "email"));
      }

      const pwdPattern = String(password).match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,32}$/
      );
      if (!pwdPattern) {
        return send(res, setErrResMsg(RESPONSE.INVALID, "password pattern"));
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      await userModel.create({
        ...req.body,
        password: encryptedPassword,
      });

      return send(res, RESPONSE.SUCCESS);
    } catch (error) {
      console.log("register", error);
      return send(res, RESPONSE.UNKNOWN_ERR);
    }
  }
);
