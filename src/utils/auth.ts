export const saveAccessTokenToLS = (access_token: string): void => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenFromLS = (): void => {
  localStorage.removeItem('access_token')
}

export const getAccessTokenFromLS = (): string =>
  localStorage.getItem('access_token') || ''
