import jwt from 'jsonwebtoken'



const verifyJWT=(req,_,next)=>{
 // console.log('auth',req.body)
try {
  const token = req.header('Authorization').replace('Bearer ', '');
  //console.log('Token:', token);  
   // console.log(process.env.SECRETKEY);
    const decoded = jwt.verify(token, process.env.SECRETKEY);
   console.log("decode data" ,decoded) 
   console.log("req password",req.body.password)
      if(req.body.password!== decoded.password){ 
        throw new Error("token is not valid")
      }
    
      //console.log(decoded.userid);
      req.id=decoded.userid
      console.log('authorization successfully')
     next();
  } catch(err) {
    // err
    throw  err
  }
}

export {verifyJWT}