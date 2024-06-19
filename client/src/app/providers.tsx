import ApolloClientProvider from '@/contexts/apollo_client'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import ReduxStoreProvider from '@/contexts/redux_store'

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AntdRegistry>
      <ApolloClientProvider>
        <ReduxStoreProvider>
          {children}
        </ReduxStoreProvider>
      </ApolloClientProvider>
    </AntdRegistry>
  )
}

export default Providers