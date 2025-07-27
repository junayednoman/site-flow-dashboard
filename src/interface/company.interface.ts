
export interface TCompanyData {
  _id: string
  email: string
  __v: number
  createdAt: string
  is_blocked: boolean
  is_deleted: boolean
  role: string
  updatedAt: string
  user: User
  user_type: string
  is_account_verified: boolean
}

export interface User {
  _id: string
  email: string
  company_name: string
  name: string
  image: string
  logo: string
}
