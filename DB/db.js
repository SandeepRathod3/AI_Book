import mysql from 'mysql'

const connection=mysql.createConnection(
    {
        host:process.env.HOST,
        user:'root',
        password: process.env.PASSWORD,
        database:"ai_book",
    }
)


connection.connect( function(err){
    if(err){
        console.log("error connecting :"+ err.stack)
        return;
    }
    
    console.log('connected as id'+ connection.threadId)
});

export{connection}