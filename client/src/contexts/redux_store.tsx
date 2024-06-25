'use client'

import { Provider } from 'react-redux'
import { store } from '@/stores'

const ReduxStoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxStoreProvider