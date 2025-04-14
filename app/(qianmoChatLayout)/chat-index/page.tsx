'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import './style.css';
import {
  TwitchFilled,
  OpenAIFilled,
  SlackCircleFilled,
  ZhihuCircleFilled,
  SafetyCertificateOutlined,
  BankOutlined,
  TeamOutlined
} from '@ant-design/icons';

// 定义菜单项接口
interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
  color: string;
}

// 菜单项数据
const menuItems: MenuItem[] = [
  {
    key: '0',
    icon: <TwitchFilled style={{ fontSize: '2rem', color: '#4f46e5' }} />,
    label: 'AI对话',
    desc: '随时随地问问AI',
    color: '#4f46e5'
  },
  {
    key: '1',
    icon: <ZhihuCircleFilled style={{ fontSize: '2rem', color: '#0C328E' }} />,
    label: '知识库',
    desc: '企业的智慧宝库',
    color: '#0C328E'
  },
  {
    key: '2',
    icon: <OpenAIFilled style={{ fontSize: '2rem', color: '#10B981' }} />,
    label: '智能问数',
    desc: '企业的数据智囊',
    color: '#10B981'
  },
  {
    key: '3',
    icon: <SlackCircleFilled style={{ fontSize: '2rem', color: '#EF4444' }} />,
    label: '智能体',
    desc: '强大全面的智能AI',
    color: '#EF4444'
  },
];

const App: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const leftQuestions = [
    {
      text: "如何提高煤矿安全生产效率？"
    },
    {
      text: "煤炭企业如何实现数字化转型？"
    },
    {
      text: "煤矿智能化建设的关键技术有哪些？"
    }
  ];

  const rightQuestions = [
    {
      text: "煤炭行业如何实现绿色可持续发展？"
    },
    {
      text: "煤矿智能化管理系统的应用前景如何？"
    },
    {
      text: "煤炭企业如何提升运营效率？"
    }
  ];

  return (
    <div className={`home ${isLoaded ? 'loaded' : ''}`}>
      <header className="hero">
        <div className="header-content">
          {/* <div className="logo"> */}
          {/*   <img src="/images/logo.png" alt="Logo"/> */}
          {/* </div> */}
          <div className="title-container">
            <h1>
              <span className="main-title">阡陌智能体平台</span>
              <span className="sub-title">智创未来新动能</span>
            </h1>
          </div>
        </div>
      </header>
      <div className="preview-section">
        <div className="decorative-circles">
          <div className="decorative-circle"></div>
          <div className="decorative-circle"></div>
          <div className="decorative-circle"></div>
          <div className="decorative-circle"></div>
        </div>
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="floating">
          <div className="center-circle">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          {isVisible && (
            <>
              <Link href="/chat-ai">
                <div
                  className={`floating-box top ${hoveredItem === '0' ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredItem('0')}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    borderColor: hoveredItem === '0' ? menuItems[0].color : undefined
                  }}
                >
                  <div className="icon-wrapper">{menuItems[0].icon}</div>
                  <div className="label">{menuItems[0].label}</div>
                  <div className="desc">{menuItems[0].desc}</div>
                </div>
              </Link>
              <Link href="/chat-knowledge">
              <div
                className={`floating-box bottom ${hoveredItem === '1' ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredItem('1')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  borderColor: hoveredItem === '1' ? menuItems[1].color : undefined
                }}
              >
                <div className="icon-wrapper">{menuItems[1].icon}</div>
                <div className="label">{menuItems[1].label}</div>
                <div className="desc">{menuItems[1].desc}</div>
              </div>
              </Link>
              <Link href="/chat-bi">
              <div
                className={`floating-box left ${hoveredItem === '2' ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredItem('2')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  borderColor: hoveredItem === '2' ? menuItems[2].color : undefined
                }}
              >
                <div className="icon-wrapper">{menuItems[2].icon}</div>
                <div className="label">{menuItems[2].label}</div>
                <div className="desc">{menuItems[2].desc}</div>
              </div>
              </Link>
              <Link href="/chat-agent">
              <div
                className={`floating-box right ${hoveredItem === '3' ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredItem('3')}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  borderColor: hoveredItem === '3' ? menuItems[3].color : undefined
                }}
              >
                <div className="icon-wrapper">{menuItems[3].icon}</div>
                <div className="label">{menuItems[3].label}</div>
                <div className="desc">{menuItems[3].desc}</div>
              </div>
              </Link>
            </>
          )}
        </div>
        <div className="side-questions left">
          {leftQuestions.map((question, index) => (
            <div
              key={index}
              className="question-item"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <p className="question-text">{question.text}</p>
            </div>
          ))}
        </div>
        <div className="side-questions right">
          {rightQuestions.map((question, index) => (
            <div
              key={index}
              className="question-item"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <p className="question-text">{question.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default App;
export const layout = false