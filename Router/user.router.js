import { Router } from "express";
import { verifyJWT } from "../middileware/auth.middileware.js";
import { loginUser, signInUser , updatePassword} from "../controller/user.controller.js";

const router=Router()

router.route('/signin').post(signInUser)
router.route('/login').post(loginUser)
router.route('/update-password').post(verifyJWT,updatePassword)

export default router

