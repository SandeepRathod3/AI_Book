import express from 'express'
import dotenv from 'dotenv'

dotenv.config(
    {
        path:"./.env"
    }
)
const app=express();

app.use(express.json());

// router
import userRouter from './Router/user.router.js'

// router declaration
app.use("/users", userRouter)


app.listen(process.env.PORT|| 7000,()=>{
    console.log(`server is runing on ${process.env.PORT}`);
}
)