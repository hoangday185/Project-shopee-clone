import { User } from 'src/@types/users.type'

export const setAccessTokenToLS = (access_token: string): void => {
  localStorage.setItem('access_token', access_token)
}

export const clearLocalStorage = (): void => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getAccessTokenFromLS = (): string =>
  localStorage.getItem('access_token') || ''

export const getProfileFormLS = (): User | null => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const setProfileToLS = (profile: User): void => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
