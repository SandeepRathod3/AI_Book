import jwt from 'jsonwebtoken'



const verifyJWT=(req,_,next)=>{
 // console.log('auth',req.body)
try {
  const token = req.header('Authorization').replace('Bearer ', '');
  //console.log('Token:', token);  
   // console.log(process.env.SECRETKEY);
    const decoded = jwt.verify(token, process.env.SECRETKEY);
   // console.log(decoded)
      if(req.password=== decoded.password){
        console.log('authorization successfully')
      }
      //console.log(decoded.userid);
      req.id=decoded.userid
     next();
  } catch(err) {
    // err
    throw  err
  }
}

export {verifyJWT}