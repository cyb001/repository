"use client";

import "./style.scss"
import React from "react";
import ResizeContainer from "@/app/qianmo/components/resize";
import TopMenu from "@/app/qianmo/components/support/topMenu";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <ResizeContainer
      direction="vertical"
      initialSize={55}
      move={false}
      showBar={false}
      minSize={0}
      maxSize={55}
    >
      <div slot="first" style={{width: "100%", height: "100%", position:"relative"}}>
        <TopMenu showText />
      </div>
      <div slot="second">{children}</div>
    </ResizeContainer>
  );
};

export default Layout;
