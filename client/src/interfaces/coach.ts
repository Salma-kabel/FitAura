import type { User } from './user'

export interface Coach extends Omit<User, 'professional'> {
  description?: string
  category: string
  company?: {
    name: string
    logo: string
  }
}
