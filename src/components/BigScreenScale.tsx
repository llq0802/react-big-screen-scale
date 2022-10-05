import React, { CSSProperties, FC, useEffect, useRef } from 'react';
import { BigScreenScaleType } from './types.d';
// import './BigScreenScale.less';

interface IState {
  originalWidth: string | number;
  originalHeight: string | number;
  width?: string | number;
  height?: string | number;
}

/**
 * 防抖函数
 * @param {T} fn
 * @param {number} delay
 * @returns {() => void}
 */
function debounce<T = Function>(fn: T, delay: number = 300): () => void {
  let timer: NodeJS.Timeout;
  return function(...args: any[]): void {
    if (timer) clearTimeout(timer);
    timer = setTimeout(
      () => {
        typeof fn === 'function' && fn.apply(null, args);
        clearTimeout(timer);
      },
      delay > 0 ? delay : 100
    );
  };
}

/**
 *
 * 缩放组件
 * @param {*} props
 * @return {*}
 */
const BigScreenScale: FC<Partial<BigScreenScaleType>> = props => {
  const {
    width = 1920,
    height = 1080,
    autoScale = true,
    isfullScreen = false,
    containerStyle,
    wrapperStyle,
    children,
  } = props;

  const screenWrapper = useRef<HTMLDivElement>(null);
  const state = useRef<IState>({
    width: 0,
    height: 0,
    originalWidth: 0,
    originalHeight: 0,
  });

  const styles: Record<string, CSSProperties> = {
    container: {
      overflow: 'hidden',
      backgroundSize: `100% 100%`,
      width: `100vw`,
      height: `100vh`,
      // background: `#000`,
    },
    wrapper: {
      transitionProperty: `all`,
      transitionTimingFunction: `cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDuration: `500ms`,
      position: `relative`,
      overflow: `hidden`,
      zIndex: 100,
      transformOrigin: `left top`,
      // transformOrigin: `center center`,
    },
  };

  const onResize = debounce(() => {
    initSize();
    updateSize();
    updateScale();
  });

  /**
   * 初始化大屏容器宽高
   */
  const initSize = () => {
    // region 获取大屏真实尺寸
    if (width && height) {
      state.current.width = width;
      state.current.height = height;
    } else {
      state.current.width = screenWrapper.current?.clientWidth;
      state.current.height = screenWrapper.current?.clientHeight;
    }

    // region 获取画布尺寸
    if (!state.current.originalHeight || !state.current.originalWidth) {
      state.current.originalWidth = window.screen.width;
      state.current.originalHeight = window.screen.height;
    }
  };

  /**
   * 更新大屏容器宽高
   */
  const updateSize = () => {
    if (state.current.width && state.current.height) {
      screenWrapper.current!.style.width = `${state.current.width}px`;
      screenWrapper.current!.style.height = `${state.current.height}px`;
    } else {
      screenWrapper.current!.style.width = `${state.current.originalWidth}px`;
      screenWrapper.current!.style.height = `${state.current.originalHeight}px`;
    }
  };

  const setDomScale = (scale: number) => {
    if (!autoScale) return;

    const domWidth = screenWrapper.current!.clientWidth;
    const domHeight = screenWrapper.current!.clientHeight;

    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;

    screenWrapper.current!.style.transform = `scale(${scale},${scale})`;

    // 计算外边距
    let mx = Math.max((bodyWidth - domWidth * scale) / 2, 0);
    let my = Math.max((bodyHeight - domHeight * scale) / 2, 0);

    if (typeof autoScale === 'object') {
      !((autoScale as unknown) as { x: boolean; y: boolean }).x && (mx = 0);
      !((autoScale as unknown) as { x: boolean; y: boolean }).y && (my = 0);
    }

    screenWrapper.current!.style.margin = `${my}px ${mx}px`;
  };

  const updateScale = () => {
    // 获取真实视口尺寸
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;
    // 获取大屏最终的宽高
    const realWidth = state.current.width || state.current.originalWidth;
    const realHeight = state.current.height || state.current.originalHeight;
    // 计算缩放比例
    const widthScale = bodyWidth / +realWidth;
    const heightScale = bodyHeight / +realHeight;

    // 若要铺满全屏，则按照各自比例缩放
    if (isfullScreen) {
      screenWrapper.current!.style.transform = `scale(${widthScale},${heightScale})`;
    } else {
      // 按照宽高最小比例进行缩放
      const scale = Math.min(widthScale, heightScale);
      setDomScale(scale);
    }
  };

  useEffect(() => {
    initSize();
    updateSize();
    updateScale();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section
      className="react-big-screen-scale"
      style={{ ...styles.container, ...containerStyle }}
    >
      <div ref={screenWrapper} style={{ ...styles.wrapper, ...wrapperStyle }}>
        {children ?? '请传入被要包裹的组件'}
      </div>
    </section>
  );
};

export default BigScreenScale;
