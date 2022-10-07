<h1 align="center">Welcome to react-big-screen-scale 👋</h1>
<div align="center"> 
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <img src="https://img.shields.io/badge/npm-0.12-orange.svg" />
  <img src="https://img.shields.io/github/issues/crazylxr/3dtagcloudforeact.svg" />
  <img src="https://img.shields.io/github/forks/crazylxr/3dtagcloudforeact.svg" />
  <img src="https://img.shields.io/github/stars/crazylxr/3dtagcloudforeact.svg" />
  <img src="https://img.shields.io/github/license/crazylxr/3dtagcloudforeact.svg" />
</div>

 <!-- ![](https://img.shields.io/github/license/crazylxr/3dtagcloudforeact.svg) -->

### 🏠 [主页地址](https://github.com/llq0802/react-big-screen-scale)

React Component based on `transform-scale` CSS3 for transportation element.

## 安装

```sh
yarn add react-big-screen-scale

# or

npm i react-big-screen-scale
```

## 快速上手

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BigScreenScale, { BigScreenScaleType } from 'react-big-screen-scale';

const App = () => {
  return (
    <BigScreenScale>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'red',
        }}
      >
        这是一个demo
      </div>
    </BigScreenScale>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Props

|      属性      |                                                                            描述                                                                             |                类型                 | 是否必需 | 默认值 |
| :------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------: | :------: | :----: |
|     width      |                                                                          大屏宽度                                                                           |               number                |    否    |  1920  |
|     height     |                                                                          大屏高度                                                                           |               number                |    否    |  1080  |
|     delay      |                                                                    窗口变化防抖延迟时间                                                                     |               number                |    否    | 400ms  |
|   autoScale    | 自适应配置，配置为 boolean 类型时，为启动或者关闭自适应，配置为对象时，若 x 为 true，x 轴产生边距，y 为 true 时，y 轴产生边距，启用 fullScreen 时此配置失效 | boolean / { x: boolean; y:boolean } |    否    |  true  |
|  isfullScreen  |                                是否开启全屏自适应，启用此配置项时会存在拉伸效果，同时 autoScale 失效，非必要情况下不建议开启                                |               boolean               |    否    | false  |
| containerStyle |                                                          修改根容器样式，如居中展示时侧边背景色，                                                           |            CSSProperties            |    否    |   -    |
|  wrapperStyle  |                                                                   修改组件自适应区域样式                                                                    |            CSSProperties            |    否    |   -    |

---

> **注意 :** `请将body样式设置 overflow: hidden , 建议设置body宽高与视口宽高一致`

## 参与贡献

```sh
git clone https://github.com/llq0802/react-big-screen-scale.git
#or
git clone git@github.com:llq0802/react-big-screen-scale.git

cd react-big-screen-scale
yarn
yarn start
```

打开一个新的终端

```sh
cd example
yarn
yarn start
访问`http://localhost:1234`
```

## 测试

```sh
yarn test
```

## 联系我

👤 **VX :** **llq958614130** | **E-mail :** **958614130@qq.com**

## 支持

❤️ ❤️ ❤️ 觉得还行的话请不吝啬你的小心心奥 ❤️ ❤️ ❤️

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
