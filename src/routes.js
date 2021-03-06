const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const ErrorController = require('./controllers/ErrorController')
const DashboardController = require('./controllers/DashboardController')
const AuthController = require('./controllers/AuthController')

const AuthMiddleware = require('./middlewares/AuthMiddleware')

routes.get('/', (req, res) => {
  return res.status(200).json({ version: '1.0.0', message: 'Sight API working!' })
})

routes.post('/user', UserController.store)
routes.get('/projects', AuthMiddleware.authenticated, ProjectController.index)
routes.post('/projects', AuthMiddleware.authenticated, ProjectController.store)
routes.post('/errors', AuthMiddleware.authenticated, ErrorController.store)
routes.get('/errors/:errorId', AuthMiddleware.authenticated, ErrorController.show)
routes.put('/errors/:errorId', AuthMiddleware.authenticated, ErrorController.update)
routes.get('/dashboard', AuthMiddleware.authenticated, DashboardController.index)
routes.post('/auth', AuthController.store)

module.exports = routes