import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/doctorRoute.js'
import authRouter from './routes/authRouter.js'
import chatRouter from './routes/chatRoute.js'

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)


app.get('/', (req, res)=>{
    res.send('API working')
})

app.listen(port, ()=>console.log("Server started, port: ", port))