import React, { useRef, useEffect } from 'react';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/**
 * 防抖函数
 * @param {T} fn
 * @param {number} delay
 * @returns {() => void}
 */

function debounce(fn, delay) {
  if (delay === void 0) {
    delay = 300;
  }

  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      typeof fn === 'function' && fn.apply(null, args);
      clearTimeout(timer);
    }, delay > 0 ? delay : 100);
  };
}
/**
 *
 * 缩放组件
 * @param {*} props
 * @return {*}
 */


var BigScreenScale = function BigScreenScale(props) {
  var _props$width = props.width,
      width = _props$width === void 0 ? 1920 : _props$width,
      _props$height = props.height,
      height = _props$height === void 0 ? 1080 : _props$height,
      _props$autoScale = props.autoScale,
      autoScale = _props$autoScale === void 0 ? true : _props$autoScale,
      _props$isfullScreen = props.isfullScreen,
      isfullScreen = _props$isfullScreen === void 0 ? false : _props$isfullScreen,
      containerStyle = props.containerStyle,
      wrapperStyle = props.wrapperStyle,
      children = props.children;
  var screenWrapper = useRef(null);
  var state = useRef({
    width: 0,
    height: 0,
    originalWidth: 0,
    originalHeight: 0
  });
  var styles = {
    container: {
      overflow: 'hidden',
      backgroundSize: "100% 100%",
      width: "100vw",
      height: "100vh"
    },
    wrapper: {
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      transitionDuration: "500ms",
      position: "relative",
      overflow: "hidden",
      zIndex: 100,
      transformOrigin: "left top"
    }
  };
  var onResize = debounce(function () {
    initSize();
    updateSize();
    updateScale();
  });
  /**
   * 初始化大屏容器宽高
   */

  var initSize = function initSize() {
    // region 获取大屏真实尺寸
    if (width && height) {
      state.current.width = width;
      state.current.height = height;
    } else {
      var _screenWrapper$curren, _screenWrapper$curren2;

      state.current.width = (_screenWrapper$curren = screenWrapper.current) == null ? void 0 : _screenWrapper$curren.clientWidth;
      state.current.height = (_screenWrapper$curren2 = screenWrapper.current) == null ? void 0 : _screenWrapper$curren2.clientHeight;
    } // region 获取画布尺寸


    if (!state.current.originalHeight || !state.current.originalWidth) {
      state.current.originalWidth = window.screen.width;
      state.current.originalHeight = window.screen.height;
    }
  };
  /**
   * 更新大屏容器宽高
   */


  var updateSize = function updateSize() {
    if (state.current.width && state.current.height) {
      screenWrapper.current.style.width = state.current.width + "px";
      screenWrapper.current.style.height = state.current.height + "px";
    } else {
      screenWrapper.current.style.width = state.current.originalWidth + "px";
      screenWrapper.current.style.height = state.current.originalHeight + "px";
    }
  };

  var setDomScale = function setDomScale(scale) {
    if (!autoScale) return;
    var domWidth = screenWrapper.current.clientWidth;
    var domHeight = screenWrapper.current.clientHeight;
    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight;
    console.log('setDomScale', scale);
    screenWrapper.current.style.transform = "scale(" + scale + "," + scale + ")";
    var mx = Math.max((bodyWidth - domWidth * scale) / 2, 0);
    var my = Math.max((bodyHeight - domHeight * scale) / 2, 0);

    if (typeof autoScale === 'object') {
      !autoScale.x && (mx = 0);
      !autoScale.y && (my = 0);
    }

    screenWrapper.current.style.margin = my + "px " + mx + "px";
  };

  var updateScale = function updateScale() {
    // 获取真实视口尺寸
    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight; // 获取大屏最终的宽高

    var realWidth = state.current.width || state.current.originalWidth;
    var realHeight = state.current.height || state.current.originalHeight; // 计算缩放比例

    var widthScale = bodyWidth / +realWidth;
    var heightScale = bodyHeight / +realHeight;
    console.log('isfullScreen', isfullScreen); // 若要铺满全屏，则按照各自比例缩放

    if (isfullScreen) {
      screenWrapper.current.style.transform = "scale(" + widthScale + "," + heightScale + ")";
    } else {
      // 按照宽高最小比例进行缩放
      var scale = Math.min(widthScale, heightScale);
      setDomScale(scale);
    }
  };

  useEffect(function () {
    initSize();
    updateSize();
    updateScale();
    window.addEventListener('resize', onResize);
    return function () {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return React.createElement("section", {
    className: "react-big-screen-scale",
    style: _extends({}, styles.container, containerStyle)
  }, React.createElement("div", {
    ref: screenWrapper,
    style: _extends({}, styles.wrapper, wrapperStyle)
  }, children != null ? children : '请传入被要包裹的组件'));
};

export default BigScreenScale;
//# sourceMappingURL=react-big-screen-scale.esm.js.map
