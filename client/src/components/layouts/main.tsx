'use client'

import { Layout } from 'antd'
import Navbar from '../navbar'

const { Header, Content, Footer } = Layout

const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Header 
        style={{ 
          backgroundColor: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
        }}
      >
        <h1>Cinema</h1>
        <Navbar />
      </Header>
      <Content style={{ padding: '1rem 3.125rem 1rem 3.125rem' }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Cinema App ©2024 Created by Thanasak</Footer>
    </Layout>
  )
}

export default Main