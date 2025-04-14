"use client";

import React, { useEffect, useState } from "react";
import { Segmented } from "antd";
import ResizeContainer from "@/app/qianmo/components/resize";
import { getTagbarList } from "./request";
import Icon from "@/app/qianmo/components/antIcon";
import AgentApp from "./app"
import AgentLLM from "./llm"
import AgentTag from "./tag"
import AgentTemplate from "./template"
import AgentTool from "./tool"

interface TagBar {
  id: string;
  name: string;
  icon: string;
  value: string;
}

const SupportAgent: React.FC<any> = () => {
  const [currentKey, setCurrentKey] = useState("app");
  const [tagbars, setTagbars] = useState<TagBar[]>([]);

  useEffect(() => {
    const fetchTagbarList = async () => {
      try {
        const bars = await getTagbarList();
        setTagbars(bars);
      } catch (error) {
        console.error("Error fetching menu list:", error);
      }
    };

    fetchTagbarList();
  }, []);

  const handleTagChange = (value: string) => {
    setCurrentKey(value);
  };

  return (
    <ResizeContainer
      direction="vertical"
      initialSize={40}
      move={true}
      showBar={true}
      minSize={0}
      maxSize={40}
    >
      <div
        slot="first"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <div
          style={{
            margin: "5px 0 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Segmented
            style={{ backgroundColor: "transparent" }}
            size={"middle"}
            shape="round"
            value={currentKey}
            onChange={(value) => handleTagChange(value as string)}
            options={tagbars.map((item: TagBar) => {
              return {
                label: item.name,
                value: item.value,
                icon: <Icon name={item.icon} />,
              };
            })}
          />
        </div>
      </div>
      <div slot="second">
        { currentKey === 'app'? <AgentApp/> : ''}
        { currentKey === 'llm'? <AgentLLM/> : ''}
        { currentKey === 'tag'? <AgentTag/> : ''}
        { currentKey === 'template'? <AgentTemplate/> : ''}
        { currentKey === 'tool'? <AgentTool/> : ''}
      </div>
    </ResizeContainer>
  );
};

export default SupportAgent;
