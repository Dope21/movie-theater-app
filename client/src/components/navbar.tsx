'use client'

import { Menu } from 'antd'

const items = [
  { key: 1, label: 'Movies' },
  { key: 2, label: 'Profile' },
  { key: 3, label: 'Settings' },
]

const Navbar = () => 
  <Menu 
    mode="horizontal" 
    defaultSelectedKeys={['1']} 
    items={items} 
    style={{ minWidth: 0, flex: 'auto', justifyContent: 'flex-end' }}
  />

export default Navbar