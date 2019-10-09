const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const ErrorController = require('./controllers/ErrorController')
const DashboardController = require('./controllers/DashboardController')
const AuthController = require('./controllers/AuthController')

const AuthMiddleware = require('./middlewares/AuthMiddleware')


routes.get('/', (res) => {
  return res.json({ version: '1.0.0', message: 'Sight API working!' })
})

routes.post('/user', AuthMiddleware.authenticated, UserController.store)
routes.get('/projects', AuthMiddleware.authenticated, ProjectController.index)
routes.post('/projects', AuthMiddleware.authenticated, ProjectController.store)
routes.post('/errors', AuthMiddleware.authenticated, ErrorController.store)
routes.post('/dashboard', AuthMiddleware.authenticated, DashboardController.show)
routes.post('/auth', AuthController.store)

module.exports = routes