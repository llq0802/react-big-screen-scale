import { CSSProperties } from 'react';

export declare type BigScreenScaleType = {
  /**大屏宽度 */
  width: number;
  /**大屏高度 */
  height: number;
  /**窗口变化防抖延迟时间 */
  delay: number;
  /**自适应配置，配置为boolean类型时，为启动或者关闭自适应，配置为对象时，若x为true，x轴产生边距，y为true时，y轴产生边距，启用fullScreen时此配置失效 */
  autoScale: boolean | { x: boolean; y: boolean };
  /**是否开启全屏自适应，启用此配置项时会存在拉伸效果，同时autoScale失效，非必要情况下不建议开启 */
  isfullScreen: boolean;
  /**修改根容器样式，如居中展示时侧边背景色， */
  containerStyle?: CSSProperties;
  /**修改组件自适应区域样式 */
  wrapperStyle?: CSSProperties;
};
