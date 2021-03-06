import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserControler {
  async handle(request: Request, response: Response): Promise<Response> {
    
    const { code, mobile } = request.body
    const service = new AuthenticateUserService()
    try {
      const result = await service.execute(code, mobile)
      return response.json(result)
    } catch (error) {
      return response.json(error.message)
    }
  }
}

export { AuthenticateUserControler }
