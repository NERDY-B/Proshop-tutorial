import path from 'path'
import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';


import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
//HTTP server creation file 

//allows for script to load environment variables from any .env file extension found in the same directory as the file 
//must always be called in any file that want to access the enviromnment variable
dotenv.config();
connectDB()

// const products = []

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
//allows us accept json data in the postman body

app.get('/', (req, res) => {
    res.send('API is running');
})

//with sserver creation file, using the method use() allows us to point to certain 
//file in our project folder in backend and load it content once a request is made matching the reques in the parenthesis
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)
//an "endpoint" typically refers to a specific URL or route within your server application 
//Contains the url and a function which can be defined in the parameter parenthesis or importe

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
//by default our upload folder in the root dir is not accessible consequentially we use 
//express to make it accessible my convertng the folder to become satic uisng express.static()

app.use(notFound)

app.use(errorHandler)
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.red.bold));
