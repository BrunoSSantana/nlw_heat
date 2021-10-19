import { Router } from "express";
import { AuthenticateUserControler } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const routes = Router()

routes.post('/authenticate', new AuthenticateUserControler().handle)

routes.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

routes.get('/messages/last3', new GetLast3MessagesController().handle)

routes.get('/profile', ensureAuthenticated, new ProfileUserController().handle)

export { routes }