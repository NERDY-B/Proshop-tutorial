import express from 'express'
// import Product from '../models/productModel'
const router = express.Router()
import {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
// the protect in the get() verifies the jwt , then getUserProfile responds a message success 
export default router