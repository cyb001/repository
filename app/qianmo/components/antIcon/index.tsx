import React, { Suspense, lazy, useMemo } from "react";
import { LoadingOutlined} from "@ant-design/icons";

// 定义支持的图标名称类型（根据实际需要扩展）
type AntIconName = string;

interface IconComponentProps {
  name: AntIconName;
  className?: string;
  style?: React.CSSProperties;
  spin?: boolean;
  rotate?: number;
  onClick?: () => void;
}

// 缓存已加载的图标组件
const iconCache = new Map<string, React.ComponentType<any>>();

const IconComponent: React.FC<IconComponentProps> = ({ 
  name, 
  className, 
  style, 
  spin, 
  rotate, 
  onClick 
}) => {
  const AntIcon = useMemo(() => {
    // 如果图标已缓存，直接返回
    if (iconCache.has(name)) {
      return iconCache.get(name)!;
    }

    // 动态导入图标
    const Icon = lazy(async () => {
      try {
        const module = await import("@ant-design/icons");
        const IconComponent = module[name as keyof typeof module];
        
        if (!IconComponent) {
          throw new Error(`Icon ${name} not found`);
        }

        // 缓存图标组件
        iconCache.set(name, IconComponent);
        return { default: IconComponent };
      } catch (error) {
        console.error("Failed to load icon:", error);
        // 返回一个默认的占位图标
        const FallbackIcon = () => (
          <span className="anticon anticon-placeholder">
            <i style={{ color: '#ff4d4f' }}>❌</i>
          </span>
        );
        return { default: FallbackIcon };
      }
    });

    return Icon;
  }, [name]);

  return (
    <Suspense fallback={
      <span className="anticon anticon-loading">
        {/* <i style={{ opacity: 0.5 }}>⌛</i> */}
        <LoadingOutlined/>
      </span>
    }>
      <AntIcon 
        className={className}
        style={style}
        spin={spin}
        rotate={rotate}
        onClick={onClick}
      />
    </Suspense>
  );
};

export default React.memo(IconComponent);