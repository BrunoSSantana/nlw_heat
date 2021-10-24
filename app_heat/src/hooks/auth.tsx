import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as AuthSession from 'expo-auth-session'
import { api } from "../services/api"

const client_id = '9105b9417ddcc054fb02'
const scope = 'read:user'
const user_storage = '@nlwheat:user'
const token_storage = '@nlwheat:token'

type User = {
  id: string
  avatar_url: string
  name: string
  login: string
}

type AuthContextData = {
  user: User | null
  isSignIngIn: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthResponse = {
  token: string
  user: User
}

type AuthorizationResponse = {
  params: {
    code?: string
    error?: string
  }
  type?: string
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [isSignIngIn, setIsSignIngIn] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  
  async function signIn() {
    try {
      setIsSignIngIn(true)
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code, mobile: true })
        const { user, token } = await authResponse.data as AuthResponse

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
        await AsyncStorage.setItem(user_storage, JSON.stringify(user))
        await AsyncStorage.setItem(token_storage, token)
  
        setUser(user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSignIngIn(false)
    }
    
  }

  async function signOut() {
    setUser(null)
    await AsyncStorage.removeItem(user_storage)
    await AsyncStorage.removeItem(token_storage)
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(user_storage)
      const tokenStorage = await AsyncStorage.getItem(token_storage)

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
        setUser(JSON.parse(userStorage))
      }

      setIsSignIngIn(false)
    }

    loadUserStorageData()

  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isSignIngIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth}
