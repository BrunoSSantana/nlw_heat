import axios from 'axios'
import { sign } from 'jsonwebtoken'
import { prismaClient } from '../prisma'

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string
  login: string
  id: number
  name: string
}

class AuthenticateUserService {
  async execute(code:string, mobile: boolean) {
    const url = 'https://github.com/login/oauth/access_token'

    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: mobile? process.env.GITHUB_CLIENT_ID_MOBILE : process.env.GITHUB_CLIENT_ID_WEB,
        client_secret: mobile? process.env.GITHUB_CLIENT_SECRET_MOBILE : process.env.GITHUB_CLIENT_SECRET_WEB,
        code
      },
      headers: {
        "Accept": "application/json"
      }
    })

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    })

    const { avatar_url, id, login, name } = response.data

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id
      }
    })

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name
        }
      })
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        }
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }
      )

    return { token, user }
  }
}

export { AuthenticateUserService }
