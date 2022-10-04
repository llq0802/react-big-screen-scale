import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Test from '../.';
import '../dist/react-big-screen-scale.min.css';
import './index.less';

const App = () => {
  return (
    <Test isfullScreen>
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'red',
        }}
      >
        测试
      </div>
    </Test>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
