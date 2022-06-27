import express from 'express'

// Safety
import authMiddleware from '../../middlewares/auth'

// Usersx
import UsersController from '../../controllers/usersController'
import UsersEmployeeController from '../../controllers/userEmployee'

const router = express.Router()

router.post('/registerUser', UsersController.index)

router.get('/loginUser', UsersController.login)

router.post('/registerUserEmployee', authMiddleware, UsersEmployeeController.register)
router.get('/getUserEmployee', authMiddleware, UsersEmployeeController.getUsers)
router.delete('/deleteUserEmployee', authMiddleware, UsersEmployeeController.deleteUserEmployee)

export default router.use('/v1', router)
