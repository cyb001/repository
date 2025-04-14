'use client'
import React, { useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation'
import {
  TwitchFilled,
  OpenAIFilled,
  RedditCircleFilled,
  ZhihuCircleFilled,
  SlackCircleFilled
} from '@ant-design/icons';
import Link from 'next/link'
import './layout.css';
import UserTag from './chat-usersetting/page';
// 定义菜单项接口
interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
}

// 菜单项数据
const menuItems: MenuItem[] = [
  { key: '0', icon: <TwitchFilled />, label: 'AI对话' },
  { key: '1', icon: <ZhihuCircleFilled />, label: '知识库' },
  { key: '2', icon: <OpenAIFilled />, label: '智能问数' },
  { key: '3', icon: <SlackCircleFilled />, label: '智能体' },
];
const Layout = ({ children }: { children: ReactNode }) => {
  const [currentKey, setCurrentKey] = useState<string>('3');
  const router = useRouter() // 获取路由实例
  // 处理菜单项点击事件
  const handleMenuClick = (key: string) => {
    setCurrentKey(key);
    // 根据key跳转到不同路由
    switch(key) {
      case '0':
        router.push('/chat-ai') // AI对话
        break
      case '1':
        router.push('/chat-knowledge') // 知识库
        break
      case '2':
        router.push('/chat-bi') // 智能问数
        break
      case '3':
        router.push('/chat-agent') // 智能体
        break
      default:
        router.push('/')
    }
  };
  const pathname = usePathname()
  
  // 排除不需要布局的路径
  const excludePaths = ['/chat-index']
  if (excludePaths.includes(pathname)) {
    return <>{children}</>
  }
  return (
    <>
    <div className="app-container">
        <div className="main-container">
          {/* 侧边栏 */}
          <div className="sidebar">
          <Link href="/chat-index">
            <div className="main-logo" >
              <img src="/images/logo.png" alt="Logo" />
            </div>
          </Link>
            <div className="menu-items-container">
              {menuItems.map(item => {
                const isSelected = currentKey === item.key;
                return (
                  <div
                    key={item.key}
                    className={`menu-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <span className="menu-item-icon-container">
                      {React.cloneElement(item.icon, {
                        className: 'menu-item-icon'
                      })}
                    </span>
                    <span className="menu-item-label">{item.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="user-tag-container">
              <UserTag />
            </div>
          </div>
          {/* 内容区域 */}
          <div className="content-area">
          {children}
          </div>
        </div>
    </div>
    </>
  )
}

export default Layout
