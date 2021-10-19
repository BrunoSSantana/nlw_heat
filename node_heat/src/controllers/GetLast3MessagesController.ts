import { Request, Response } from "express";
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

class GetLast3MessagesController {
  async handle(request: Request, response: Response): Promise<Response> {

    try {
      const service = new GetLast3MessagesService()
      const messages = await service.execute()
      return response.json(messages)      
    } catch (error) {
      return response.json(error.message)
    }
  }
}

export { GetLast3MessagesController }
