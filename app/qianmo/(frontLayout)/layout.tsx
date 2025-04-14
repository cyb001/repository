"use client";
import { useRef, type ReactNode, type FC } from "react";
import ResizeContainer, {
  ResizeContainerHandle,
} from "@/app/qianmo/components/resize";
import Sidebar from "@/app/qianmo/components/font/sidebar";

const Layout: FC<any> = ({ children }) => {
  const resizeRef = useRef<ResizeContainerHandle>(null);

  const toggleFold = () => {
    resizeRef.current?.triggerFold(true); // 或 false 来展开
  };
  return (
    <ResizeContainer
      ref={resizeRef}
      direction="horizontal"
      initialSize={70}
      move={false}
      showBar={false}
      minSize={0}
      maxSize={70}
    >
      <div slot="first" style={{width: "100%", height: "100%", position:"relative"}}>
        <Sidebar showText />
      </div>
      <div slot="second">{children}</div>
    </ResizeContainer>
  );
};

export default Layout;
