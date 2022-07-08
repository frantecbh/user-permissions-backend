import Routes from 'express'
import { SessionController } from '../controllers/SessionController'
import { UserController } from '../controllers/UserController'

const routes = Routes()


const createUserController = new UserController()
const authenticateUserController = new SessionController()

routes.post('/create-user', createUserController.create)
routes.post('/login', authenticateUserController.create)

export default routes;
