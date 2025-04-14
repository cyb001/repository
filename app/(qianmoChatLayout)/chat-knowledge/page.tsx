'use client'
import React, { useState, useEffect } from 'react';
// import DifyChat from '../dify-chat';
// import { fetchKnowledgeList } from '@/service'

interface Card {
  title: string;
  icon: string;
  type: string;
  desc: string;
  tags: string[];
  apiBase: string;
  apiVersion: string;
  appId: string;
  apiKey: string;
}

interface CardData {
  [key: string]: Card[];
}

const cardData: CardData[] = [
    {
      title: '人员信息知识库',
      icon: '/images/agent/deepseek.png',
      type: 'KNOWLEDGE',
      desc: '本工作流主要是用到了知识检索组件+知识库实现私有化知识库检索功能',
      tags: ['数据问答', '通用问答', '报告问答'],
      apiBase: 'http://10.16.10.113',
      apiVersion: '/v1',
      appId: '974262e7-3565-4af0-ae5f-79b0c92a86b9',
      apiKey: 'app-Vuoc1ifQpjYMiGMyjShUiWhv',
    },
    {
      title: '规则制度知识库',
      icon: '/images/agent/deepseek.png',
      type: 'KNOWLEDGE',
      desc: '本工作流主要是用到了知识检索组件+知识库实现私有化知识库检索功能',
      tags: ['数据问答', '通用问答', '报告问答'],
      apiBase: 'http://10.16.10.113',
      apiVersion: '/v1',
      appId: 'ba169b32-bf21-4510-9fad-36de07bd23c4',
      apiKey: 'app-qEVHVfiSSS9twTz7dv9bj6LI',
    },
    {
      title: '政府报文知识库',
      icon: '/images/agent/deepseek.png',
      type: 'KNOWLEDGE',
      desc: '本工作流主要是用到了知识检索组件+知识库实现私有化知识库检索功能',
      tags: ['数据问答', '通用问答', '报告问答'],
      apiBase: 'http://10.16.10.113',
      apiVersion: '/v1',
      appId: 'ba169b32-bf21-4510-9fad-36de07bd23c4',
      apiKey: 'app-QXhFzqP7gJHCckT2zxRQJA1N',
    },
  ];

const RUNTIME_VARS_KEY = "DIFY_CHAT__RUNTIME_VARS";
const RECENT_TITLES_KEY = "RECENT_CONVERSATION_TITLES";

const setRuntimeVars = (apiBase: string, apiVersion: string, apiKey: string) => {
  const runtimeVars = {
    DIFY_API_BASE: apiBase,
    DIFY_API_VERSION: apiVersion,
    DIFY_API_KEY: apiKey,
  };
  localStorage.setItem(RUNTIME_VARS_KEY, JSON.stringify(runtimeVars));
};

const DifAgent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [activeTab, setActiveTab] = useState<string | null>('find');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [currentAppTitle, setCurrentAppTitle] = useState<string | null>('');
  const [currentAppId, setCurrentAppId] = useState<any | null>(null);
  const [defaultMessage, setDefaultMessage] = useState<any | null>(null);
  const [recentConversationTitles, setRecentConversationTitles] = useState<string[]>(() => {
    if (typeof window !== 'undefined') { // 添加浏览器环境判断
      const savedTitles = localStorage.getItem(RECENT_TITLES_KEY);
      return savedTitles ? JSON.parse(savedTitles) : [];
    }
    return [];
  });
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [agentList, setAgentList] = useState<CardData[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // const [res] = await Promise.all([fetchKnowledgeList()]);
        setAgentList(cardData);
      } catch (error) {
        console.log('error', error)
      }
    })()
    if (typeof window !== 'undefined') { // 添加浏览器环境判断
      localStorage.setItem(RECENT_TITLES_KEY, JSON.stringify(recentConversationTitles));
    }
  }, [recentConversationTitles]);

  const handleCardClick = async (card: Card): Promise<void> => {
    setSelectedCard(card);
    setCurrentAppId(card.appId)
    setCurrentAppTitle(card.title);
    setDefaultMessage(null)
    setRuntimeVars(card.apiBase, card.apiVersion, card.apiKey);
    setActiveTitle(card.title);
    setActiveTab(null);
  };

  const handleBack = async (): Promise<void> => {
    setCurrentAppId(null);
    setActiveTab('find');
  };

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
    setSelectedCard(null); // 重置 selectedCard 状态
    setActiveTitle(null);
  };

  const handleRecentTitleClick = (title: string): void => {
    const card = Object.values(cardData).flat().find(card => card.title === title);
    if (card) {
      setSelectedCard(card);
      setRuntimeVars(card.apiBase, card.apiVersion, card.apiKey);
      setActiveTitle(title);
      setActiveTab(null);
    }
  };

  const handleCreateClick = (): void => {
    window.open('http://10.16.10.113', '_blank');
  };

  const icons = ['⏳ ', '👀 ', '🐌 ', '☀️ ', '🍃 ']
  const questions: any[] = [
    { key: '1', appId: '974262e7-3565-4af0-ae5f-79b0c92a86b9', title: '集团制度查询AI助手', desc: '项目立项的准备工作有哪些？' },
    { key: '2', appId: '974262e7-3565-4af0-ae5f-79b0c92a86b9', title: '集团制度查询AI助手', desc: '物资采购需要哪些流程？' },
    { key: '3', appId: '974262e7-3565-4af0-ae5f-79b0c92a86b9', title: '集团制度查询AI助手', desc: '安全管理二十条红线是指什么？' },
    { key: '4', appId: '974262e7-3565-4af0-ae5f-79b0c92a86b9', title: '集团制度查询AI助手', desc: '到北京出差的住宿报销标准是多少？' },
    { key: '5', appId: '974262e7-3565-4af0-ae5f-79b0c92a86b9', title: '集团制度查询AI助手', desc: '集团信息化管理办法共包含多少章多少条？' },
    { key: '6', appId: '974262e7-3565-4af0-ae5f-79b0c92a86b9', title: '集团制度查询AI助手', desc: '信息化项目验收需要准备哪些资料？' },
    { key: '7', appId: '974262e7-3565-4af0-ae5f-79b0c92a86b9', title: '集团制度查询AI助手', desc: '集团今年发布的“安全一号文”与去年版本的“安全一号文”有哪些主要区别和变化？' },
  ];

  const handleQuestionClick = (item: any): void => {
    setCurrentAppId(item.appId)
    setCurrentAppTitle(item.title)
    setDefaultMessage(item.desc)
  }

  return (
    <div className="agent-platform">
      {/* 左侧导航区 */}
      <div className="left-navigation">
        <div className="content-card-title" style={{fontWeight: 'bolder'}}>知识库热点问题列表</div>
        <div className="content-card-box">
          {
            questions.map((item, index) => {
              return (
                <div className="content-card" key={item.key} onClick={() => handleQuestionClick(item)}>
                  <div className="content-card-text">
                    <div className="content-card-title">{item.title}</div>
                    <div className="content-card-desc">
                      {icons[index % 5]}
                      {item.desc}
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* 主内容区 */}
      <div className="main-content">
        {currentAppId ? (
          <div className="chat-container">
            <div className="title-bar">
              <button className="back-button" onClick={handleBack}>
                <svg className="arrow-left" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="title-bar-text">{currentAppTitle}</div>
            </div>
            <div className="chat">
              {/* <DifyChat appId={currentAppId} defaultMessage={defaultMessage} key={currentAppId + defaultMessage} /> */}
            </div>
          </div>
        ) : (
          <>
            {/* 顶部区域 */}
            <div className="container gradient">
              {/* 搜索区域 */}
              <div className="search-section">
                <div className="search-wrapper">
                  <img src="/images/agent/search.png" alt="功能预览" />
                  <input
                    type="text"
                    placeholder="请输入知识库名称"
                    maxLength={150}
                  />
                </div>
              </div>
              {/* 内容区块 */}
              <div className="content-section">
                <div className="content-wrapper">
                  <div className="text-content">
                    <div className="title">淮河能源-知识库</div>
                    <div className="title subtitle">欢迎使用淮河能源 AI 知识库！</div>
                  </div>
                  <div className="image-content">
                    <img src="/images/agent/zsk.jpg" alt="功能预览" />
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              {/* 分类标签 */}
              <div className="category-tags">
                {['全部', '规章制度', '安全培训', '设备使用'].map(cat => (
                  <div
                    key={cat}
                    className={`tag-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </div>
                ))}
              </div>

              {/* 智能体列表 */}
              <div className="agent-list">
                {activeTab === 'find' && (
                  <>
                    {agentList.filter(card => selectedCategory === '全部' || card.tags
                      .some(tag => tag.name === selectedCategory)).map((card) => (
                      <div className="agent-card" onClick={() => handleCardClick(card)} key={card.title}>
                        <div className="card-header">
                          <img src='/images/agent/deepseek.png' alt="robot" />
                          <div className="card-info">
                            <h3>{card.title}</h3>
                            <p className="official-tag">
                              <span>{card.type}</span>
                            </p>
                          </div>
                        </div>
                        <p className="card-desc">{card.desc}</p>
                        <div className="card-stats">
                          {card.tags.map((stat, index) => (
                            <span key={index}>{stat.name}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {activeTab === 'mine' && (
                  <>
                    {cardData['我的智能体'].map((card) => (
                      <div className="agent-card" onClick={() => handleCardClick(card)} key={card.title}>
                        <div className="card-header">
                          <img src={card.icon} alt="mine" />
                          <div className="card-info">
                            <h3>{card.title}</h3>
                            <p className="official-tag">
                              <span>{card.type}</span>
                            </p>
                          </div>
                        </div>
                        <p className="card-desc">{card.desc}</p>
                        <div className="card-stats">
                          {card.tags.map((stat, index) => (
                            <span key={index}>{stat}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DifAgent;
