import { Router } from "express";
import { verifyJWT } from "../middileware/auth.middileware.js";
import { deleteUser, loginUser, signInUser , updatePassword} from "../controller/user.controller.js";

const router=Router()


router.route('/signin').post(signInUser)
router.route('/login').post(loginUser)
router.route('/update-password').put(verifyJWT,updatePassword)
router.route('/delete').delete(verifyJWT,deleteUser)

export default router 

