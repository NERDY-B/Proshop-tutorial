import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()
// connectDB()


const importData = async () => {
    try {
        await connectDB()
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        // console.log(await User.insertMany(users));

        //returned the promise which is an array to the variable coming from file ./data/user

        const adminUser = createdUsers[0]._id
        //remember that when documents are created, passed in to the mongoDB via mongoose methods, 
        //it does automatically add the ._id property to be able to uniquely identify the document

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })


        const myProduct = await Product.insertMany(sampleProducts)
        console.log(myProduct);
        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {

        console.error(`${error}`.red.inverse)
        process.exit(1)

    }
}


const destroyData = async () => {
    try {
        await connectDB();
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()


        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {

        console.error(`${error}`.red.inverse)
        process.exit(1)

    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}