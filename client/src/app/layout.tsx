import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'
import Main from '@/components/layouts/main'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cinema',
  description: 'Discover the perfect movie and book tickets',
}

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <Providers>
          <Main>
            {children}
          </Main>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout