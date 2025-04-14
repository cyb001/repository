import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  CSSProperties,
} from "react";
import styles from "./Resize.module.css";

type Direction = "horizontal" | "vertical";

interface ResizeContainerProps {
  direction?: Direction;
  initialSize: number;
  minSize?: number;
  maxSize?: number | null;
  move?: boolean;
  showBar?: boolean;
  children?: ReactNode;
}

export interface ResizeContainerHandle {
  triggerFold: (isFold?: boolean) => void;
}

const getDimensionStyles = (
  size: number,
  direction: Direction,
  minSize: number,
  maxSize: number | null,
  move: boolean,
  showBar: boolean
): CSSProperties => {
  const style: CSSProperties = {};
  const dimension = direction === "horizontal" ? "width" : "height";
  const capitalized = dimension.replace(/^\w/, (c) =>
    c.toUpperCase()
  ) as Capitalize<typeof dimension>;

  style[dimension] = `${size}px`;
  style[`min${capitalized}`] = `${minSize}px`;

  if (maxSize !== null) {
    style[`max${capitalized}`] = `${maxSize}px`;
  }
  if (!move) {
    style.transition = "0.3s";
  }
  return style;
};

const ResizeContainer = forwardRef<ResizeContainerHandle, ResizeContainerProps>(
  (props, ref) => {
    const {
      direction = "horizontal",
      initialSize,
      minSize = 0,
      maxSize = null,
      move = true,
      showBar = true,
      children,
    } = props;

    const [size, setSize] = useState(initialSize);
    const isDragging = useRef(false);
    const startPosition = useRef(0);
    const startSize = useRef(initialSize);
    const containerRef = useRef<HTMLDivElement>(null);

    const canDrag = useMemo(() => {
      return move && (maxSize === null || maxSize !== minSize);
    }, [move, maxSize, minSize]);

    const firstPaneStyle = useMemo(() => {
      return getDimensionStyles(size, direction, minSize, maxSize, move);
    }, [size, direction, minSize, maxSize, move]);

    const secondPaneStyle = useMemo<CSSProperties>(
      () => ({
        flex: 1,
        overflow: "hidden",
      }),
      []
    );

    const triggerFold = (isFold: boolean = false) => {
      if (isFold) {
        setSize(minSize);
      } else {
        setSize(maxSize || initialSize);
      }
    };

    const setCursor = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canDrag) return;
      const target = e.target as HTMLDivElement;
      target.style.cursor =
        direction === "horizontal" ? "col-resize" : "row-resize";
    };

    const resetCursor = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLDivElement;
      target.style.cursor = "";
    };

    const handleMouseMove = useRef((e: MouseEvent) => {
      if (!isDragging.current) return;

      const currentPosition =
        direction === "horizontal" ? e.clientX : e.clientY;
      const delta = currentPosition - startPosition.current;
      let newSize = startSize.current + delta;

      // 应用边界限制
      newSize = Math.max(minSize, newSize);
      if (maxSize !== null) {
        newSize = Math.min(maxSize, newSize);
      }

      setSize(newSize);
    });

    const handleMouseUp = useRef(() => {
      isDragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove.current);
      document.removeEventListener("mouseup", handleMouseUp.current);
      document.body.style.userSelect = "";
    });

    const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!canDrag) return;

      isDragging.current = true;
      startPosition.current =
        direction === "horizontal" ? e.clientX : e.clientY;
      startSize.current = size;

      document.addEventListener("mousemove", handleMouseMove.current);
      document.addEventListener("mouseup", handleMouseUp.current);
      document.body.style.userSelect = "none";
    };

    useEffect(() => {
      return () => {
        if (isDragging.current) {
          document.removeEventListener("mousemove", handleMouseMove.current);
          document.removeEventListener("mouseup", handleMouseUp.current);
        }
      };
    }, []);

    useImperativeHandle(ref, () => ({
      triggerFold,
    }));

    // 获取插槽内容
    const slots: { first?: ReactNode; second?: ReactNode } = {};
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const slot = child.props.slot as string | undefined;
        if (slot === "first") {
          slots.first = child;
        } else if (slot === "second") {
          slots.second = child;
        }
      }
    });

    return (
      <div
        className={`${styles["resize-container"]} ${styles[direction]}`}
        ref={containerRef}
      >
        <div className={styles["first-pane"]} style={firstPaneStyle}>
          {slots.first}
        </div>
        {showBar?
          <div
            className={`${styles["resize-trigger"]} ${move ? styles["bar"] : ""}`}
            onMouseDown={startDrag}
            onMouseEnter={setCursor}
            onMouseLeave={resetCursor}
          />
          :""
        }
        <div className={styles["second-pane"]} style={secondPaneStyle}>
          {slots.second}
        </div>
      </div>
    );
  }
);

ResizeContainer.displayName = "ResizeContainer";

export default ResizeContainer;
