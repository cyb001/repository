export const getMenuList = () => {
  return [
    {
      id: "1",
      name: "对话",
      icon: "TwitchFilled",
      path: "/qianmo/front/chat",
    },{
      id: "2",
      name: "知识库",
      icon: "ZhihuCircleFilled",
      path: "/qianmo/front/knowledge",
    },{
      id: "3",
      name: "问数",
      icon: "OpenAIFilled",
      path: "/qianmo/front/db",
    },{
      id: "4",
      name: "智能体",
      icon: "SlackCircleFilled",
      path: "/qianmo/front/agent",
    },
  ];
};
