const Router = require('express').Router
const userController = require('../controllers/userController.js')
const router = new Router()


router.post('/registration',userController.regisrtation)
router.post('/login',userController.login)
router.post('/logout',userController.logout)
router.get('/activation/:link',userController.activate)
router.get('/refresh', userController.refresh)
router.get('/user',userController.getUser)

module.exports = router