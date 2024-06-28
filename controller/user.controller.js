import { connection } from "../DB/db.js";
import {
  insertUserAndGetId,
  userLoginValid,
  updateUserPassword,deleteUserData
} from "../model/user.model.js"; 
import jwt from "jsonwebtoken";
import  crypto from 'crypto-js'


// SIGN-IN USER
const signInUser = async (req, res) => {
  try {
    const { name, email, password, contect_no, address } = req.body;

    //console.log(name, email, password, contect_no, address);
    if (!(name && email && password && contect_no && address)) {
      return   res.status(400).json({ message: "all field are required(name,email,password,contect_no,address)" });
    }
      const hashPassword=crypto.MD5(password).toString();
      // console.log(hashPassword)
      req.body.password =hashPassword;
    const getResultData = await insertUserAndGetId(req.body,
       function (result) {
      console.log("my result data ", result);
    });

    console.log("user created succussfully ");
    return res.status(200).json({
      status: 200,
      message: "user is created",
      data: [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name) {
      return res.status(400).json({ Message: "username or email is required" });
    }
    if (!password) {
    return  res.status(400).json({ Message: "password is required" });
    }

    const validuser= await userLoginValid(req.body);
      console.log("valid user",validuser)
    
      const passwordDecode= crypto.MD5(password).toString();
        //  console.log("passowordDecode",passwordDecode);
        //  console.log("passowrd",validuser[0].password)
        //cheak password validation
      if(passwordDecode!==validuser[0].password){  
      return  res.status(401).json({ Message: "password is wrong " });
      }
      const userid=validuser[0].id
  console.log ( "user id", userid)
    const token = jwt.sign(
      {
        userid,
        name,
        password,
      },
      process.env.SECRETKEY,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      status: 200,
      message: "user is login",
      testf: "fsdfsdfsd",
      data: [token],
    });
  } catch (error) {
    console.error(error);
  return  res.status(500).json({ message: "Internal server error" });
  }   
};


//UPDATE USER  ACCOUNT PASSWORD
const updatePassword = async (req, res) => {
  try {
    const {password, newPassword } = req.body;
       
    if (!password) {
     return res.status(400).json({ Message: "password is required" });
    }
    if (!newPassword) {
     return res.status(400).json({ Message: "new passowrd is required" });
    }
    const updatePassword = await updateUserPassword(req);

    if(!updatePassword){
     return res.status(400).json({ Message: "invalid update credentials" });
    }

    return res.status(200).json({
      status: 200,
      message: "user password is change",
      data: [],
    });
  } catch (error) {
    throw error;
  }
};


//DELETE USER ACCOUNT
const deleteUser= async(req,res)=>{ 
  try {
       const deletedUser= await deleteUserData(req.id)
       if(!deleteUser){
        return res.status(400).json({message:"data is not deleted"})
       }
       return res.status(200).json({message:"data is deleted"})
  } catch (error) {
    console.log(error)
    return res.status(400).json({message:"Error in delete data"})
  }
}

//EDIT USER DETAILS 
const editDetail=async(req,res)=>{
  try {
        const updateDetail=req.body
        

  } catch (error) {
    
  }
}



export { signInUser, loginUser,deleteUser, updatePassword };
