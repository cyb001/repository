'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'

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

type CardData = Card[];

const cardData: CardData = [
    {
      title: '知识库问答测试（二）',
      icon: '/images/agent/deepseek.png',
      type: 'CHATFLOW',
      desc: '本工作流主要是用到了知识检索组件+知识库实现私有化知识库检索功能',
      tags: ['数据问答', '通用问答', '报告问答'],
      apiBase: 'http://10.16.10.113',
      apiVersion: '/v1',
      appId: '6431d12c-b7ba-4e81-bc0e-b2d8deb35907',
      apiKey: 'app-Vuoc1ifQpjYMiGMyjShUiWhv',
    },
    {
      title: '文档测试',
      icon: '/images/agent/deepseek.png',
      type: 'CHATFLOW',
      desc: '本工作流主要是用到了知识检索组件+知识库实现私有化知识库检索功能',
      tags: ['数据问答', '通用问答', '报告问答'],
      apiBase: 'http://10.16.10.113',
      apiVersion: '/v1',
      appId: 'a8f79ece-1a14-4eda-a2a5-988118f92375',
      apiKey: 'app-WFkPb6xipGlixrcy1VWvA5gZ',
    },
    {
      title: '集团制度查询AI助手',
      icon: '/images/agent/deepseek.png',
      type: '聊天助手',
      desc: '查询集团内各类规章制度文件。',
      tags: ['AI助手', '制度查询'],
      apiBase: 'http://10.16.10.113',
      apiVersion: '/v1',
      appId: 'ba169b32-bf21-4510-9fad-36de07bd23c4',
      apiKey: 'app-qEVHVfiSSS9twTz7dv9bj6LI',
    },
    {
      title: '深度搜索',
      icon: '/images/agent/deepseek.png',
      type: 'CHATFLOW',
      desc: '全方位深入分析，精准获取深层信息的检索方法',
      tags: ['多方位', '全层次', '智能检索'],
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
    const savedTitles = localStorage.getItem(RECENT_TITLES_KEY);
    return savedTitles ? JSON.parse(savedTitles) : [];
  });
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [agentList, setAgentList] = useState<Card[]>([]);
  const router = useRouter() // 获取路由实例
  
  useEffect(() => {
    (async () => {
      try {
        // const [res] = await Promise.all([fetchAgentList()]);
        setAgentList(cardData);
      } catch (error) {
        console.log('error', error)
      }
    })()
    localStorage.setItem(RECENT_TITLES_KEY, JSON.stringify(recentConversationTitles));
  }, [recentConversationTitles]);

  const handleCardClick = async (card: Card): Promise<void> => {
    setSelectedCard(card);
    setCurrentAppId(card.appId)
    setCurrentAppTitle(card.title)
    setDefaultMessage(null)
    setRuntimeVars(card.apiBase, card.apiVersion, card.apiKey);
    setActiveTitle(card.title);
    setActiveTab(null);
    router.push(`/chat-agent/${card.appId}`) // AI对话
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
    // { key: '0', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '经营管理问答', desc: '请简要阐述组织绩效考核、经营绩效考核和岗位绩效考核的定义。' },
    { key: '1', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '经营管理问答', desc: '当井下支护材料采购金额超过500万元时，需遵循哪些特殊的招标流程？' },
    { key: '2', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '经营管理问答', desc: '请概述集团公司当前执行的合同管理办法。' },
    // { key: '3', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '安全生产问答', desc: '集团公司今年发布的“安全一号文”与去年版本相比，主要有哪些变化和区别？' },
    // { key: '4', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '安全生产问答', desc: '请列举淮河能源安全生产4号文中的20条相关规定。' },
    { key: '5', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '安全生产问答', desc: '国家矿山安全监察局发布的关于加强煤矿通风安全监管的指导意见内容是什么？' },
    { key: '7', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '文档编写', desc: '请依据集团行文规范和集团《信息化管理办法》，帮我编写一份关于项目运维的方案。' },
    { key: '9', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '文档编写', desc: '我需要策划一场《女职工创先争优》主题活动，请结合集团相关制度，设计出主题活动方案，并生成一份方案报告。' },
    { key: '10', appId: 'bf1f0f07-1e11-46bb-a54a-85b7279d7409', title: '文档审查', desc: '请根据我提供的信息化规划方案，并结合集团《信息化管理办法》或相关附件，协助进行审查。' },
  ];

  const handleQuestionClick = (item): void => {
    setDefaultMessage(item.desc)
    setCurrentAppId(item.appId)
    setCurrentAppTitle(item.title)
  }

  return (
    <div className="agent-platform">
      {/* 左侧导航区 */}
      <div className="left-navigation">
        <div className="content-card-title" style={{fontWeight: 'bolder'}}>智能体热点问题列表</div>
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
            {/* 顶部区域 */}
            <div className="container gradient">
              {/* 搜索区域 */}
              <div className="search-section">
                <div className="search-wrapper">
                  <img src="/images/agent/search.png" alt="功能预览" />
                  <input
                    type="text"
                    placeholder="请输入智能体名称"
                    maxLength={150}
                  />
                </div>
              </div>
              {/* 内容区块 */}
              <div className="content-section">
                <div className="content-wrapper">
                  <div className="text-content">
                    <div className="title">淮河能源-智能体</div>
                    <div className="title subtitle">欢迎使用淮河能源 AI 智能体！</div>
                  </div>
                  <div className="image-content">
                    <img src="/images/agent/znt.png" alt="功能预览" />
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              {/* 分类标签 */}
              <div className="category-tags">
                {['全部', '日常办公', '安全生产', '经营管控'].map(cat => (
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
                    {agentList.map((card) => (
                      <div className="agent-card" onClick={() => handleCardClick(card)} key={card.title}>
                        <div className="card-header">
                          <img src='/images/agent/deepseek.png' alt="mine" />
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
              </div>
            </div>
      </div>
    </div>
  );
};

export default DifAgent;
