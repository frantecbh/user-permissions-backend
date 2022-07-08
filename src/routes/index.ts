import Routes from 'express'
import { UserController } from '../controllers/UserController'

const routes = Routes()


const createUserController = new UserController()

routes.post('/create-user', createUserController.create)

export default routes;
