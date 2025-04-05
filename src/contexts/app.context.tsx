import { createContext, useState } from 'react'
import { Purchase } from 'src/@types/purchase.types'
import { User } from 'src/@types/users.type'

import { getAccessTokenFromLS, getProfileFormLS } from 'src/utils/auth'

export interface ExtendedPurchaseList extends Purchase {
  disabled: boolean
  checked: boolean
}

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchaseList: ExtendedPurchaseList[]
  setExtendedPurchaseList: React.Dispatch<React.SetStateAction<ExtendedPurchaseList[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFormLS(),
  setProfile: () => null,
  extendedPurchaseList: [],
  setExtendedPurchaseList: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchaseList, setExtendedPurchaseList] = useState<ExtendedPurchaseList[]>([])
  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extendedPurchaseList,
        setExtendedPurchaseList
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
