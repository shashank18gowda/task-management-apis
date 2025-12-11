import { Router } from "express";
import { send, setErrResMsg } from "../../helper/responseHelper.js";
import { RESPONSE } from "../../config/global.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import inituserModel from "../../model/userModel.js";
import { ISACTIVE } from "../../config/constants.js";

const router = Router();

export default router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    let userModel = await inituserModel();

    if (email == "" || email == undefined) {
      return send(res, setErrResMsg(RESPONSE.REQUIRED, "email"));
    }

    if (password == "" || password == undefined) {
      return send(res, setErrResMsg(RESPONSE.REQUIRED, "password"));
    }

    let userData = await userModel.findOne({
      where: {
        isactive: ISACTIVE.ACTIVE,
        email,
      },
    });

    if (userData && (await bcrypt.compare(password, userData.password))) {
      const token = jwt.sign(
        {
          id: userData.user_id,
        },
        process.env.TOKEN_KEY
      );

      return send(res, RESPONSE.SUCCESS, {
        access_token: token,
      });
    } else {
      return send(res, setErrResMsg(RESPONSE.INVALID, "Login credential"));
    }
  } catch (err) {
    console.log("login: ", err);
    return send(res, RESPONSE.UNKNOWN_ERR);
  }
});
