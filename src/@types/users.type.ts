type RoleType = 'Admin' | 'User'

export interface User {
  _id: string
  roles: RoleType[]
  email: string
  name: string
  date_of_birth: string
  address: string
  phone: string
  createdAt: string
  updatedAt: string
}
