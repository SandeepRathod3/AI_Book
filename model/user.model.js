import { connection } from "../DB/db.js";

async function getUser(userId) {
  const sql = "SELECT * FROM users WHERE id = ?";
  const rows = await db.query(sql, [userId]);
  return rows[0]; // Assuming there's only one user with the ID
}

async function insertUserData() {}
async function getUserIdByUsername(username) {
  const sql = "SELECT id FROM users WHERE username = ?";
  const [rows] = await db.query(sql, [username]);
  return rows[0]?.id; // Return ID if user exists, otherwise undefined
}

async function insertUserAndGetId(data,callback) {
  try {
    // Assuming `db` is your database connection and `users` is your collection/table
    const sql ="INSERT INTO user (name, email,password,contect_no,address) VALUES (?,?,?,?,?)";
    return connection.query(
      sql,
      [data.name, data.email, data.password,  data.contect_no,data.address],
      function (error, result, field) {
        if (error) throw error;
       // return result
        return callback(result);
      }
    );
  } catch (error) {
    console.error("Error in insertUserAndGetId:", error);
    throw error;
  }
}
   


const userLoginValid = (data) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE name = ? ";
    connection.query(sql, [data.name], (error, result) => {
      if (error) {
        console.error("Error in login user");
        return reject(error);
      }
      if (result.length === 0) {
        console.log("Error in login user: no user found");
        return reject(new Error("Invalid credentials"));
      }
      resolve(result);
    });
  });
};


const updateUserPassword=async(data)=>{ 
 return  new Promise((resolve,reject)=>{
        //password  selecting query
      const sql='SELECT password FROM user WHERE id =? '
    connection.query(sql,[data.id],(error, result) => {
        if (error) {
          console.error("Error in update passowrd");
          return reject(error);
        }
        if (result.length === 0) {
          console.log("Error in password user: no user found");
          return reject(new Error("Invalid  1credentials"));
        }
         
        //check password is meching
        if (data.body.password==result[0].password) {
          console.log('passoword match'); 
        }else{
           console.log("password is not match");
           throw new Error('Invalid credemtials')
        }
        
        //update passowrd query
       connection.query('UPDATE user SET password = ? WHERE id = ?', [data.body.newPassword, data.id]);
         console.log('user password update successfully');
        resolve(result); 
      });
    })     
  }
// async function updateUserPassword(data){
//   try {
//     const userId=data.id
//     console.log(userId)
//    const result =  connection.query('SELECT password FROM user WHERE id = ?',  [userId]);
//       console.log(result)
//     // Check if user exists
//     if (!result.length) {
//       console.log('Invalid 1 credentials');
//       return
//     }

//     if (result.password== data.password) {
//       console.log('Invalid 2 credentials');
      
//     }

//     // Update password in database
//      connection.query('UPDATE user SET password = ? WHERE id = ?', [data.newPassword, data.id]);

//      console.log('user password update successfully');
//   } catch (error) {
//     console.error("Error in updateUserPassword:", error);
//     throw error;
//   }
// }



// Delete user in mysql
const deleteUserData=async(data) => {
  return new Promise((resolve,reject)=>{
        const userId = data;
        console.log("user id",userId);
    const query = 'DELETE FROM user WHERE id = ?';
     connection.query(query, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return reject (err)
        }
          
        if (result.affectedRows === 0) {
            return reject (new Error ("not found user"))
        }
        resolve (result)
    });
  })
};


  export { insertUserAndGetId,userLoginValid ,deleteUserData,updateUserPassword};
