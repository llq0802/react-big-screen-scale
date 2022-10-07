import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BigScreenScale from '../.';
// import '../dist/react-big-screen-scale.min.css';
import './index.less';

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
        测试
      </div>
    </BigScreenScale>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
