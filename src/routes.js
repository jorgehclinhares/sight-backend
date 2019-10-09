const express = require('express')

const UserController = require('./controllers/UserController')
const ProjectController = require('./controllers/ProjectController')
const ErrorController = require('./controllers/ErrorController')
const DashboardController = require('./controllers/DashboardController')
const AuthController = require('./controllers/AuthController')

const routes = express.Router()

routes.get('/', (res) => {
  return res.json({ version: '1.0.0', message: 'Sight API working!' })
})

routes.post('/user', UserController.store)
routes.get('/projects', ProjectController.index)
routes.post('/projects', ProjectController.store)
routes.post('/errors', ErrorController.store)
routes.post('/dashboard', DashboardController.show)
routes.post('/auth', AuthController.store)

module.exports = routes