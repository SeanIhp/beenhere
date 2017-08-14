"use strict";var exports=module.exports={};/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-08
 * @author Liang <liang@maichong.it>
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('../babel-runtime/helpers/defineProperty.js');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('../babel-runtime/core-js/object/keys.js');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('../babel-runtime/core-js/object/assign.js');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('../babel-runtime/helpers/classCallCheck.js');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('../babel-runtime/helpers/createClass.js');

var _createClass3 = _interopRequireDefault(_createClass2);

var _deepEqual = require('../deep-equal/index.js');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _keyBy2 = require('../lodash/keyBy.js');

var _keyBy3 = _interopRequireDefault(_keyBy2);

var _utils = require('./utils.js');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Labrador组件基类
 * @class Component
 */

// $Flow
var Component = function () {

  /**
   * @param {object} [props] 组件props初始数据
   */

  // setState变更列表

  // setState计时器

  // 父组件

  // 组件props

  // 组件key，不等同于_listKey


  // 组件ID

  // children() 方法返回的子控件配置缓存

  // 当前组件在列表中的唯一key，即children()方法返回的配置项key属性，如果为undefined代表当前组件不在列表中


  // 组件是否已经初始化

  // 默认props
  function Component(props) {
    (0, _classCallCheck3.default)(this, Component);

    this.props = (0, _assign2.default)({}, this.constructor.defaultProps, props);
    this._setStateQueue = [];
    this._setStateCallbacks = [];
  }

  /**
   * 设置模板数据
   * @param {object|function} nextState
   * @param {function} [callback]
   */

  // 延迟更新计时器

  // setState回调函数队列

  // 组件所属page对象

  // 组件内部state

  // 组件路径

  // 组件key，

  // 组件实例化时的参数

  // 当前组件的所有子组件KV对

  // 当前组件在列表中的索引，如果为undefined代表当前组件不在列表中

  // 组件props类型定义，必须为static


  (0, _createClass3.default)(Component, [{
    key: 'setState',
    value: function setState(nextState, callback) {
      var _this = this;

      if (true) {
        if (typeof nextState === 'string') {
          console.error(this.id + '#setState() 第一个参数不能为字符串');
        }
      }
      if (!this._inited) {
        console.error(this.id + ' 组件未自动初始化之前请勿调用setState()，如果在组件构造函数中请直接使用"this.state={}"赋值语法');
      }
      this._setStateQueue.push(nextState);
      if (callback) {
        this._setStateCallbacks.push(callback);
      }

      if (this._setStateTimer) return;

      this._setStateTimer = setTimeout(function () {
        _this._setStateTimer = 0;
        var state = _this.state;
        var stateChanged = false;
        _this._setStateQueue.forEach(function (item) {
          if (typeof item === 'function') {
            item = item(state, _this.props);
          }
          if (!utils.shouldUpdate(state, item)) {
            // 如果没有发生变化，则忽略更新，优化性能
            if (true) {
              console.log('%c%s setState(%o) ignored', 'color:#fcc', _this.id, utils.getDebugObject(item));
            }
            return;
          }

          stateChanged = true;

          if (true) {
            // Development 环境打印state变化
            var original = utils.getDebugObject(state);
            var append = utils.getDebugObject(item);
            state = (0, _assign2.default)({}, state, item);
            console.log('%c%s setState(%o) : %o -> %o Component:%o', 'color:#2a8f99', _this.id, append, original, utils.getDebugObject(state), _this);
          } else {
            state = (0, _assign2.default)({}, state, item);
          }
        });

        _this.state = state;
        _this._setStateQueue = [];
        _this._setStateCallbacks.forEach(function (fn) {
          return fn();
        });
        _this._setStateCallbacks = [];

        if (!stateChanged) return;

        _this._update();
      });
    }

    /**
     * 初始化组件
     * @private
     * @param {string} key         组件key
     * @param {Component} [parent] 父组件
     * @param {number} [listIndex] 组件在列表中的index
     * @param {number} [listKey]   组件在列表中的key定义
     */

  }, {
    key: '_init',
    value: function _init(key, parent, listIndex, listKey) {
      if (this._inited) return;
      this._setKey(key, parent, listIndex, listKey);
      if (true) {
        if (this.data) {
          console.error(this.id + ' Component data属性和 setData方法已经废弃,请使用state 和 setState代替');
        }
        console.log('%c%s init %o', 'color:#9a23cc', this.id, this);
      }
      // console.log(this.path + '#init', this);
      if (!this.state) {
        this.state = {};
      }
      this._children = {};

      if (true) {
        this._checkProps();
      }

      if (key && this.onLoad) {
        if (true) {
          console.log('%c%s onLoad()', 'color:#9a23cc', this.id);
        }
        this.onLoad(this.page._loadOptions);
      }

      if (key && this.page._ready) {
        // 如果 key 不为空，则代表当前组件不是页面根组件
        // 如果 page._ready 则代表页面已经ready，说明当前组件是页面ready后才动态生成的
        utils.callLifecycle(this, 'onReady');
      }

      if (key && this.page._show) {
        utils.callLifecycle(this, 'onShow');
      }

      // 更新页面数据
      this._inited = true;
      this._update();
    }

    /**
     * 初始化时，更新组件的key、id、path等属性
     * @param {string} key         组件key
     * @param {Component} [parent] 父组件
     * @param {number} [listIndex] 组件在列表中的index
     * @param {number} [listKey]   组件在列表中的key定义
     * @private
     */

  }, {
    key: '_setKey',
    value: function _setKey(key, parent, listIndex, listKey) {
      this.key = key;
      this._listIndex = listIndex;
      this._listKey = listKey;
      if (parent) {
        this.page = parent.page;
        this.id = parent.id + ':' + key;
      }
      this.parent = parent;
      if (key && parent && parent.path) {
        this.path = parent.path + '.' + key;
      } else {
        this.path = key;
      }
      if (typeof listIndex === 'number') {
        this.path += '.' + listIndex;
        this.id += '.' + listIndex;
      }
      this.name = this.constructor.name || this.path;
      if (true && (key === 'props' || key === 'state')) {
        // $Flow 我们知道parent一定存在，但是Flow不知道
        console.error(parent.id + ' \u7684\u5B50\u7EC4\u4EF6\'' + this.name + '\'\u7684\'key\'\u4E0D\u80FD\u8BBE\u7F6E\u4E3A\'props\'\u6216\'state\'\uFF0C\u8BF7\u4FEE\u6539 ' + parent.id + '#children() \u65B9\u6CD5\u7684\u8FD4\u56DE\u503C');
      }
    }

    /**
     * 更新组件
     * @private
     */

  }, {
    key: '_update',
    value: function _update() {
      var _this2 = this;

      if (this._updateTimer) return;
      this._updateTimer = setTimeout(function () {
        _this2._updateTimer = 0;

        // 内部state数据更新后，自动更新页面数据

        var path = _this2.path ? _this2.path + '.' : '';
        var newData = {};
        newData[path + 'props'] = _this2.props;
        newData[path + 'state'] = _this2.state;
        _this2.page.updateData(newData);

        // 更新子组件列表
        _this2._updateChildren();
      });
    }

    /**
     * Development环境下检查propsTypes属性设置
     * @private
     */

  }, {
    key: '_checkProps',
    value: function _checkProps() {
      var _this3 = this;

      if (true && this.propsTypes) {
        console.warn('组件"' + this.name + '"的"propsTypes"属性应该为静态static');
      }

      if (true && this.constructor.propTypes) {
        (0, _keys2.default)(this.constructor.propTypes).forEach(function (propName) {
          var validator = _this3.constructor.propTypes[propName];
          if (typeof validator !== 'function') {
            console.warn('组件"' + _this3.name + '"的"' + propName + '"属性类型检测器不是一个有效函数');
            return;
          }
          var error = validator(_this3.props, propName, _this3.name);
          if (error) {
            console.warn(error.message);
          }
        });
      }
    }

    /**
     * 更新所有子控件，负责实例化子控件以及更新其props
     * 调用组件的children()方法获取子组件列表，如果对应的子组件存在则调用子组件onUpdate更新props，否者自动创建子组件
     * @private
     */

  }, {
    key: '_updateChildren',
    value: function _updateChildren() {
      var _this4 = this;

      var children = this._children || {};
      var configs = this.children && this.children();
      // 性能优化，当children返回的配置发生变化后才真正更新子控件
      if (!(0, _deepEqual2.default)(configs, this._childrenConfigs)) {
        if (true) {
          console.log('%c%s %s -> %o', 'color:#9a23cc', this.id, 'children()', configs);
        }
        // 遍历子组件配置列表
        (0, _keys2.default)(configs).forEach(function (key) {
          var config = configs[key];
          if (Array.isArray(config)) {
            // 如果子组件是一个列表
            var map = {}; // 依据列表中每个子组件key生成的原来组件映射
            var used = []; // 存放已知的子组件key，用来检测多个子组件是否重复使用同一个key
            var list = children[key];
            if (list && Array.isArray(list)) {
              list.forEach(function (item) {
                var _listKey = item._listKey;
                if (_listKey || _listKey === 0) {
                  map[_listKey] = item;
                }
              });
            }
            list = [];
            config.forEach(function (c, listIndex) {
              if (true && c.key === undefined) {
                console.warn('"' + _this4.name + '"\u7684\u5B50\u7EC4\u4EF6"' + key + '"\u5217\u8868\u9879\u5FC5\u987B\u5305\u542B"key"\u5C5E\u6027\u5B9A\u4E49');
              }
              var com = void 0;
              var childKey = c.key !== null && c.key !== undefined ? String(c.key) : '';
              if (childKey && map.hasOwnProperty(childKey)) {
                if (used.indexOf(childKey) === -1) {
                  com = map[childKey];
                  delete map[childKey];
                } else if (true) {
                  console.warn('"' + _this4.name + '"\u7684\u5B50\u7EC4\u4EF6"' + key + '"\u5217\u8868\u9879\u5FC5\u987B"key"\u5C5E\u6027\u5B9A\u4E49\u53D1\u73B0\u91CD\u590D\u503C\uFF1A"' + childKey + '"');
                }
                used.push(childKey);
              }
              list.push(_this4._updateChild(key, com, c, listIndex));
            });

            // 销毁没有用处的子组件
            (0, _keys2.default)(map).forEach(function (k) {
              utils.callLifecycle(map[k], 'onUnload');
            });

            children[key] = { _children: (0, _keyBy3.default)(list, function (com) {
                return com._listKey;
              }) };
            // 子组件列表更新后，统一更新列表对应的页面数据
            var newData = [];
            list.forEach(function (com) {
              newData.push({
                props: com.props,
                state: com.state,
                __k: com._listKey
              });
            });
            var path = _this4.path ? _this4.path + '.' + key : key;
            _this4.page.updateData((0, _defineProperty3.default)({}, path, newData));
          } else {
            // 子组件是单个组件，不是列表
            var component = children[key]; // 原来的组件
            children[key] = _this4._updateChild(key, component, config);
            if (component) {
              // 如果子组件原来就存在，则更后自动更新页面数据
              var _newData = {};
              _newData[component.path + '.props'] = component.props;
              _newData[component.path + '.state'] = component.state;
              _this4.page.updateData(_newData);
            }
          }
        });
      }
      this._childrenConfigs = configs;
      this._children = children;
      return children;
    }

    /**
     * 更新单个子组件
     * @param {string} key 组件key
     * @param {Component} component
     * @param {Object} config
     * @param {number} listIndex
     * @returns {Component}
     * @private
     */

  }, {
    key: '_updateChild',
    value: function _updateChild(key, component, config, listIndex) {
      if (component) {
        // 找到了原有实例，更新props
        component._setKey(key, this, listIndex, config.key);
        if (config.props && utils.shouldUpdate(component.props, config.props)) {
          var nextProps = void 0;
          if (component.props && component.props.merge && component.props.asMutable) {
            // 如果 props.merge 存在，则代表props是一个Immutable对象
            nextProps = component.props.merge(config.props);
          } else {
            nextProps = (0, _assign2.default)({}, component.props, config.props);
          }
          if (component.onUpdate) {
            if (true) {
              // Development
              var original = utils.getDebugObject(component.props);
              component.onUpdate(nextProps);
              console.log('%c%s onUpdate(%o) -> %o Component:%o', 'color:#2a8f99', this.id, original, utils.getDebugObject(component.props), component);
            } else {
              component.onUpdate(nextProps);
            }
          }
          component.props = nextProps;
          component._update();
        }
      } else {
        // 没有找到原有实例，实例化一个新的
        var ComponentClass = config.component;
        component = new ComponentClass(config.props);
        component._config = config;
        component._init(key, this, listIndex, config.key);
      }
      return component;
    }
  }]);
  return Component;
}();

exports.default = Component;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC5qcyJdLCJuYW1lcyI6WyJ1dGlscyIsIkNvbXBvbmVudCIsInByb3BzIiwiY29uc3RydWN0b3IiLCJkZWZhdWx0UHJvcHMiLCJfc2V0U3RhdGVRdWV1ZSIsIl9zZXRTdGF0ZUNhbGxiYWNrcyIsIm5leHRTdGF0ZSIsImNhbGxiYWNrIiwiX19ERVZfXyIsImNvbnNvbGUiLCJlcnJvciIsImlkIiwiX2luaXRlZCIsInB1c2giLCJfc2V0U3RhdGVUaW1lciIsInNldFRpbWVvdXQiLCJzdGF0ZSIsInN0YXRlQ2hhbmdlZCIsImZvckVhY2giLCJpdGVtIiwic2hvdWxkVXBkYXRlIiwibG9nIiwiZ2V0RGVidWdPYmplY3QiLCJvcmlnaW5hbCIsImFwcGVuZCIsImZuIiwiX3VwZGF0ZSIsImtleSIsInBhcmVudCIsImxpc3RJbmRleCIsImxpc3RLZXkiLCJfc2V0S2V5IiwiZGF0YSIsIl9jaGlsZHJlbiIsIl9jaGVja1Byb3BzIiwib25Mb2FkIiwicGFnZSIsIl9sb2FkT3B0aW9ucyIsIl9yZWFkeSIsImNhbGxMaWZlY3ljbGUiLCJfc2hvdyIsIl9saXN0SW5kZXgiLCJfbGlzdEtleSIsInBhdGgiLCJuYW1lIiwiX3VwZGF0ZVRpbWVyIiwibmV3RGF0YSIsInVwZGF0ZURhdGEiLCJfdXBkYXRlQ2hpbGRyZW4iLCJwcm9wc1R5cGVzIiwid2FybiIsInByb3BUeXBlcyIsInByb3BOYW1lIiwidmFsaWRhdG9yIiwibWVzc2FnZSIsImNoaWxkcmVuIiwiY29uZmlncyIsIl9jaGlsZHJlbkNvbmZpZ3MiLCJjb25maWciLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJ1c2VkIiwibGlzdCIsImMiLCJ1bmRlZmluZWQiLCJjb20iLCJjaGlsZEtleSIsIlN0cmluZyIsImhhc093blByb3BlcnR5IiwiaW5kZXhPZiIsIl91cGRhdGVDaGlsZCIsImsiLCJfX2siLCJjb21wb25lbnQiLCJuZXh0UHJvcHMiLCJtZXJnZSIsImFzTXV0YWJsZSIsIm9uVXBkYXRlIiwi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LGNBQUosQ0FBbUJyQixPQUFPekQsS0FBMUIsQ0FBWjtBQUNBeUUsa0JBQVVNLE9BQVYsR0FBb0J0QixNQUFwQjtBQUNBZ0Isa0JBQVVPLEtBQVYsQ0FBZ0J0RCxHQUFoQixFQUFxQixJQUFyQixFQUEyQkUsU0FBM0IsRUFBc0M2QixPQUFPL0IsR0FBN0M7QUFDRDtBQUNELGFBQU8rQyxTQUFQO0FBQ0Q7Ozs7O2tCQXpZa0IxRSxTIiwiZmlsZSI6InVua25vd24iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgTWFpY2hvbmcgU29mdHdhcmUgTHRkLiAyMDE2IGh0dHA6Ly9tYWljaG9uZy5pdFxuICogQGRhdGUgMjAxNi0xMC0wOFxuICogQGF1dGhvciBMaWFuZyA8bGlhbmdAbWFpY2hvbmcuaXQ+XG4gKi9cblxuLy8gQGZsb3dcblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZGVlcEVxdWFsIGZyb20gJ2RlZXAtZXF1YWwnO1xuLy8gJEZsb3dcbmltcG9ydCBfa2V5QnkgZnJvbSAnbG9kYXNoL2tleUJ5JztcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIExhYnJhZG9y57uE5Lu25Z+657G7XG4gKiBAY2xhc3MgQ29tcG9uZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudCB7XG4gIC8vIOm7mOiupHByb3BzXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHM6ICREYXRhTWFwO1xuICAvLyDnu4Tku7Zwcm9wc+exu+Wei+WumuS5ie+8jOW/hemhu+S4unN0YXRpY1xuICBzdGF0aWMgcHJvcFR5cGVzOiB7IFtrZXk6IHN0cmluZ106ICRQcm9wVmFsaWRhdG9yIH07XG5cbiAgLy8g57uE5Lu25piv5ZCm5bey57uP5Yid5aeL5YyWXG4gIF9pbml0ZWQ6IGJvb2xlYW47XG4gIC8vIOW9k+WJjee7hOS7tuWcqOWIl+ihqOS4reeahOe0ouW8le+8jOWmguaenOS4unVuZGVmaW5lZOS7o+ihqOW9k+WJjee7hOS7tuS4jeWcqOWIl+ihqOS4rVxuICBfbGlzdEluZGV4OiBudW1iZXIgfCB2b2lkO1xuICAvLyDlvZPliY3nu4Tku7blnKjliJfooajkuK3nmoTllK/kuIBrZXnvvIzljbNjaGlsZHJlbigp5pa55rOV6L+U5Zue55qE6YWN572u6aG5a2V55bGe5oCn77yM5aaC5p6c5Li6dW5kZWZpbmVk5Luj6KGo5b2T5YmN57uE5Lu25LiN5Zyo5YiX6KGo5LitXG4gIF9saXN0S2V5OiBzdHJpbmcgfCBudW1iZXIgfCB2b2lkO1xuICAvLyDlvZPliY3nu4Tku7bnmoTmiYDmnInlrZDnu4Tku7ZLVuWvuVxuICBfY2hpbGRyZW46ICRDaGlsZHJlbjtcbiAgLy8gY2hpbGRyZW4oKSDmlrnms5Xov5Tlm57nmoTlrZDmjqfku7bphY3nva7nvJPlrZhcbiAgX2NoaWxkcmVuQ29uZmlnczogJENoaWxkcmVuQ29uZmlnO1xuICAvLyDnu4Tku7blrp7kvovljJbml7bnmoTlj4LmlbBcbiAgX2NvbmZpZzoge307XG5cbiAgLy8g57uE5Lu2SURcbiAgaWQ6IHN0cmluZztcbiAgLy8g57uE5Lu2a2V577yMXG4gIGtleTogc3RyaW5nO1xuICAvLyDnu4Tku7ZrZXnvvIzkuI3nrYnlkIzkuo5fbGlzdEtleVxuICBuYW1lOiBzdHJpbmc7XG4gIC8vIOe7hOS7tui3r+W+hFxuICBwYXRoOiBzdHJpbmc7XG4gIC8vIOe7hOS7tnByb3BzXG4gIHByb3BzOiAkRGF0YU1hcDtcbiAgLy8g57uE5Lu25YaF6YOoc3RhdGVcbiAgc3RhdGU6ICREYXRhTWFwO1xuICAvLyDniLbnu4Tku7ZcbiAgcGFyZW50OiBDb21wb25lbnQgfCB2b2lkO1xuICAvLyDnu4Tku7bmiYDlsZ5wYWdl5a+56LGhXG4gIHBhZ2U6ICRQYWdlO1xuICAvLyBzZXRTdGF0ZeiuoeaXtuWZqFxuICBfc2V0U3RhdGVUaW1lcjogbnVtYmVyO1xuICAvLyBzZXRTdGF0ZeWbnuiwg+WHveaVsOmYn+WIl1xuICBfc2V0U3RhdGVDYWxsYmFja3M6IEFycmF5PEZ1bmN0aW9uPjtcbiAgLy8gc2V0U3RhdGXlj5jmm7TliJfooahcbiAgX3NldFN0YXRlUXVldWU6IEFycmF5PCREYXRhTWFwPjtcbiAgLy8g5bu26L+f5pu05paw6K6h5pe25ZmoXG4gIF91cGRhdGVUaW1lcjogbnVtYmVyO1xuXG4gIG9uTG9hZDogRnVuY3Rpb247XG4gIG9uUmVhZHk6IEZ1bmN0aW9uO1xuICBvblNob3c6IEZ1bmN0aW9uO1xuICBvbkhpZGU6IEZ1bmN0aW9uO1xuICBvblVubG9hZDogRnVuY3Rpb247XG4gIG9uUHVsbERvd25SZWZyZWFzaDogRnVuY3Rpb247XG4gIG9uVXBkYXRlOiBGdW5jdGlvbjtcbiAgY2hpbGRyZW46IEZ1bmN0aW9uO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gW3Byb3BzXSDnu4Tku7Zwcm9wc+WIneWni+aVsOaNrlxuICAgKi9cbiAgY29uc3RydWN0b3IocHJvcHM/OiAkRGF0YU1hcCkge1xuICAgIHRoaXMucHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcywgcHJvcHMpO1xuICAgIHRoaXMuX3NldFN0YXRlUXVldWUgPSBbXTtcbiAgICB0aGlzLl9zZXRTdGF0ZUNhbGxiYWNrcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIOiuvue9ruaooeadv+aVsOaNrlxuICAgKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja11cbiAgICovXG4gIHNldFN0YXRlKG5leHRTdGF0ZTogJERhdGFNYXAsIGNhbGxiYWNrPzogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgaWYgKHR5cGVvZiBuZXh0U3RhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5pZCArICcjc2V0U3RhdGUoKSDnrKzkuIDkuKrlj4LmlbDkuI3og73kuLrlrZfnrKbkuLInKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLl9pbml0ZWQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5pZCArICcg57uE5Lu25pyq6Ieq5Yqo5Yid5aeL5YyW5LmL5YmN6K+35Yu/6LCD55Soc2V0U3RhdGUoKe+8jOWmguaenOWcqOe7hOS7tuaehOmAoOWHveaVsOS4reivt+ebtOaOpeS9v+eUqFwidGhpcy5zdGF0ZT17fVwi6LWL5YC86K+t5rOVJyk7XG4gICAgfVxuICAgIHRoaXMuX3NldFN0YXRlUXVldWUucHVzaChuZXh0U3RhdGUpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgdGhpcy5fc2V0U3RhdGVDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NldFN0YXRlVGltZXIpIHJldHVybjtcblxuICAgIHRoaXMuX3NldFN0YXRlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3NldFN0YXRlVGltZXIgPSAwO1xuICAgICAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIGxldCBzdGF0ZUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3NldFN0YXRlUXVldWUuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpdGVtID0gaXRlbShzdGF0ZSwgdGhpcy5wcm9wcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF1dGlscy5zaG91bGRVcGRhdGUoc3RhdGUsIGl0ZW0pKSB7XG4gICAgICAgICAgLy8g5aaC5p6c5rKh5pyJ5Y+R55Sf5Y+Y5YyW77yM5YiZ5b+955Wl5pu05paw77yM5LyY5YyW5oCn6IO9XG4gICAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCclYyVzIHNldFN0YXRlKCVvKSBpZ25vcmVkJyxcbiAgICAgICAgICAgICAgJ2NvbG9yOiNmY2MnLFxuICAgICAgICAgICAgICB0aGlzLmlkLFxuICAgICAgICAgICAgICB1dGlscy5nZXREZWJ1Z09iamVjdChpdGVtKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGVDaGFuZ2VkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgIC8vIERldmVsb3BtZW50IOeOr+Wig+aJk+WNsHN0YXRl5Y+Y5YyWXG4gICAgICAgICAgbGV0IG9yaWdpbmFsID0gdXRpbHMuZ2V0RGVidWdPYmplY3Qoc3RhdGUpO1xuICAgICAgICAgIGxldCBhcHBlbmQgPSB1dGlscy5nZXREZWJ1Z09iamVjdChpdGVtKTtcbiAgICAgICAgICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBpdGVtKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnJWMlcyBzZXRTdGF0ZSglbykgOiAlbyAtPiAlbyBDb21wb25lbnQ6JW8nLFxuICAgICAgICAgICAgJ2NvbG9yOiMyYThmOTknLFxuICAgICAgICAgICAgdGhpcy5pZCwgYXBwZW5kLCBvcmlnaW5hbCxcbiAgICAgICAgICAgIHV0aWxzLmdldERlYnVnT2JqZWN0KHN0YXRlKSxcbiAgICAgICAgICAgIHRoaXNcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgdGhpcy5fc2V0U3RhdGVRdWV1ZSA9IFtdO1xuICAgICAgdGhpcy5fc2V0U3RhdGVDYWxsYmFja3MuZm9yRWFjaCgoZm4pID0+IGZuKCkpO1xuICAgICAgdGhpcy5fc2V0U3RhdGVDYWxsYmFja3MgPSBbXTtcblxuICAgICAgaWYgKCFzdGF0ZUNoYW5nZWQpIHJldHVybjtcblxuICAgICAgdGhpcy5fdXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICog5Yid5aeL5YyW57uE5Lu2XG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgICAgICAgICDnu4Tku7ZrZXlcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IFtwYXJlbnRdIOeItue7hOS7tlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpc3RJbmRleF0g57uE5Lu25Zyo5YiX6KGo5Lit55qEaW5kZXhcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaXN0S2V5XSAgIOe7hOS7tuWcqOWIl+ihqOS4reeahGtleeWumuS5iVxuICAgKi9cbiAgX2luaXQoa2V5OiBzdHJpbmcsIHBhcmVudD86IENvbXBvbmVudCwgbGlzdEluZGV4PzogbnVtYmVyLCBsaXN0S2V5Pzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2luaXRlZCkgcmV0dXJuO1xuICAgIHRoaXMuX3NldEtleShrZXksIHBhcmVudCwgbGlzdEluZGV4LCBsaXN0S2V5KTtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgaWYgKHRoaXMuZGF0YSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMuaWQgKyAnIENvbXBvbmVudCBkYXRh5bGe5oCn5ZKMIHNldERhdGHmlrnms5Xlt7Lnu4/lup/lvIMs6K+35L2/55Soc3RhdGUg5ZKMIHNldFN0YXRl5Luj5pu/Jyk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygnJWMlcyBpbml0ICVvJywgJ2NvbG9yOiM5YTIzY2MnLCB0aGlzLmlkLCB0aGlzKTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5wYXRoICsgJyNpbml0JywgdGhpcyk7XG4gICAgaWYgKCF0aGlzLnN0YXRlKSB7XG4gICAgICB0aGlzLnN0YXRlID0ge307XG4gICAgfVxuICAgIHRoaXMuX2NoaWxkcmVuID0ge307XG5cbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgdGhpcy5fY2hlY2tQcm9wcygpO1xuICAgIH1cblxuICAgIGlmIChrZXkgJiYgdGhpcy5vbkxvYWQpIHtcbiAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCclYyVzIG9uTG9hZCgpJywgJ2NvbG9yOiM5YTIzY2MnLCB0aGlzLmlkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25Mb2FkKHRoaXMucGFnZS5fbG9hZE9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChrZXkgJiYgdGhpcy5wYWdlLl9yZWFkeSkge1xuICAgICAgLy8g5aaC5p6cIGtleSDkuI3kuLrnqbrvvIzliJnku6PooajlvZPliY3nu4Tku7bkuI3mmK/pobXpnaLmoLnnu4Tku7ZcbiAgICAgIC8vIOWmguaenCBwYWdlLl9yZWFkeSDliJnku6PooajpobXpnaLlt7Lnu49yZWFkee+8jOivtOaYjuW9k+WJjee7hOS7tuaYr+mhtemdonJlYWR55ZCO5omN5Yqo5oCB55Sf5oiQ55qEXG4gICAgICB1dGlscy5jYWxsTGlmZWN5Y2xlKHRoaXMsICdvblJlYWR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKGtleSAmJiB0aGlzLnBhZ2UuX3Nob3cpIHtcbiAgICAgIHV0aWxzLmNhbGxMaWZlY3ljbGUodGhpcywgJ29uU2hvdycpO1xuICAgIH1cblxuICAgIC8vIOabtOaWsOmhtemdouaVsOaNrlxuICAgIHRoaXMuX2luaXRlZCA9IHRydWU7XG4gICAgdGhpcy5fdXBkYXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog5Yid5aeL5YyW5pe277yM5pu05paw57uE5Lu255qEa2V544CBaWTjgIFwYXRo562J5bGe5oCnXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgICAgICAgICDnu4Tku7ZrZXlcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IFtwYXJlbnRdIOeItue7hOS7tlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2xpc3RJbmRleF0g57uE5Lu25Zyo5YiX6KGo5Lit55qEaW5kZXhcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaXN0S2V5XSAgIOe7hOS7tuWcqOWIl+ihqOS4reeahGtleeWumuS5iVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3NldEtleShrZXk6IHN0cmluZywgcGFyZW50PzogQ29tcG9uZW50LCBsaXN0SW5kZXg/OiBudW1iZXIsIGxpc3RLZXk/OiBzdHJpbmcgfCBudW1iZXIgfCB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5fbGlzdEluZGV4ID0gbGlzdEluZGV4O1xuICAgIHRoaXMuX2xpc3RLZXkgPSBsaXN0S2V5O1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRoaXMucGFnZSA9IHBhcmVudC5wYWdlO1xuICAgICAgdGhpcy5pZCA9IHBhcmVudC5pZCArICc6JyArIGtleTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgaWYgKGtleSAmJiBwYXJlbnQgJiYgcGFyZW50LnBhdGgpIHtcbiAgICAgIHRoaXMucGF0aCA9IHBhcmVudC5wYXRoICsgJy4nICsga2V5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhdGggPSBrZXk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGlzdEluZGV4ID09PSAnbnVtYmVyJykge1xuICAgICAgdGhpcy5wYXRoICs9ICcuJyArIGxpc3RJbmRleDtcbiAgICAgIHRoaXMuaWQgKz0gJy4nICsgbGlzdEluZGV4O1xuICAgIH1cbiAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWUgfHwgdGhpcy5wYXRoO1xuICAgIGlmIChfX0RFVl9fICYmIChrZXkgPT09ICdwcm9wcycgfHwga2V5ID09PSAnc3RhdGUnKSkge1xuICAgICAgLy8gJEZsb3cg5oiR5Lus55+l6YGTcGFyZW505LiA5a6a5a2Y5Zyo77yM5L2G5pivRmxvd+S4jeefpemBk1xuICAgICAgY29uc29sZS5lcnJvcihgJHtwYXJlbnQuaWR9IOeahOWtkOe7hOS7ticke3RoaXMubmFtZX0n55qEJ2tleSfkuI3og73orr7nva7kuLoncHJvcHMn5oiWJ3N0YXRlJ++8jOivt+S/ruaUuSAke3BhcmVudC5pZH0jY2hpbGRyZW4oKSDmlrnms5XnmoTov5Tlm57lgLxgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5pu05paw57uE5Lu2XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLl91cGRhdGVUaW1lcikgcmV0dXJuO1xuICAgIHRoaXMuX3VwZGF0ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl91cGRhdGVUaW1lciA9IDA7XG5cbiAgICAgIC8vIOWGhemDqHN0YXRl5pWw5o2u5pu05paw5ZCO77yM6Ieq5Yqo5pu05paw6aG16Z2i5pWw5o2uXG5cbiAgICAgIGxldCBwYXRoID0gdGhpcy5wYXRoID8gdGhpcy5wYXRoICsgJy4nIDogJyc7XG4gICAgICBsZXQgbmV3RGF0YSA9IHt9O1xuICAgICAgbmV3RGF0YVtwYXRoICsgJ3Byb3BzJ10gPSB0aGlzLnByb3BzO1xuICAgICAgbmV3RGF0YVtwYXRoICsgJ3N0YXRlJ10gPSB0aGlzLnN0YXRlO1xuICAgICAgdGhpcy5wYWdlLnVwZGF0ZURhdGEobmV3RGF0YSk7XG5cbiAgICAgIC8vIOabtOaWsOWtkOe7hOS7tuWIl+ihqFxuICAgICAgdGhpcy5fdXBkYXRlQ2hpbGRyZW4oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXZlbG9wbWVudOeOr+Wig+S4i+ajgOafpXByb3BzVHlwZXPlsZ7mgKforr7nva5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jaGVja1Byb3BzKCkge1xuICAgIGlmIChfX0RFVl9fICYmIHRoaXMucHJvcHNUeXBlcykge1xuICAgICAgY29uc29sZS53YXJuKCfnu4Tku7ZcIicgKyB0aGlzLm5hbWUgKyAnXCLnmoRcInByb3BzVHlwZXNcIuWxnuaAp+W6lOivpeS4uumdmeaAgXN0YXRpYycpO1xuICAgIH1cblxuICAgIGlmIChfX0RFVl9fICYmIHRoaXMuY29uc3RydWN0b3IucHJvcFR5cGVzKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnN0cnVjdG9yLnByb3BUeXBlcykuZm9yRWFjaCgocHJvcE5hbWUpID0+IHtcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IHRoaXMuY29uc3RydWN0b3IucHJvcFR5cGVzW3Byb3BOYW1lXTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ+e7hOS7tlwiJyArIHRoaXMubmFtZSArICdcIueahFwiJyArIHByb3BOYW1lICsgJ1wi5bGe5oCn57G75Z6L5qOA5rWL5Zmo5LiN5piv5LiA5Liq5pyJ5pWI5Ye95pWwJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBlcnJvciA9IHZhbGlkYXRvcih0aGlzLnByb3BzLCBwcm9wTmFtZSwgdGhpcy5uYW1lKTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5pu05paw5omA5pyJ5a2Q5o6n5Lu277yM6LSf6LSj5a6e5L6L5YyW5a2Q5o6n5Lu25Lul5Y+K5pu05paw5YW2cHJvcHNcbiAgICog6LCD55So57uE5Lu255qEY2hpbGRyZW4oKeaWueazleiOt+WPluWtkOe7hOS7tuWIl+ihqO+8jOWmguaenOWvueW6lOeahOWtkOe7hOS7tuWtmOWcqOWImeiwg+eUqOWtkOe7hOS7tm9uVXBkYXRl5pu05pawcHJvcHPvvIzlkKbogIXoh6rliqjliJvlu7rlrZDnu4Tku7ZcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF91cGRhdGVDaGlsZHJlbigpOiAkQ2hpbGRyZW4ge1xuICAgIGxldCBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkcmVuIHx8IHt9O1xuICAgIGxldCBjb25maWdzID0gdGhpcy5jaGlsZHJlbiAmJiB0aGlzLmNoaWxkcmVuKCk7XG4gICAgLy8g5oCn6IO95LyY5YyW77yM5b2TY2hpbGRyZW7ov5Tlm57nmoTphY3nva7lj5HnlJ/lj5jljJblkI7miY3nnJ/mraPmm7TmlrDlrZDmjqfku7ZcbiAgICBpZiAoIWRlZXBFcXVhbChjb25maWdzLCB0aGlzLl9jaGlsZHJlbkNvbmZpZ3MpKSB7XG4gICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICBjb25zb2xlLmxvZygnJWMlcyAlcyAtPiAlbycsICdjb2xvcjojOWEyM2NjJywgdGhpcy5pZCwgJ2NoaWxkcmVuKCknLCBjb25maWdzKTtcbiAgICAgIH1cbiAgICAgIC8vIOmBjeWOhuWtkOe7hOS7tumFjee9ruWIl+ihqFxuICAgICAgT2JqZWN0LmtleXMoY29uZmlncykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgIGxldCBjb25maWc6ICRDaGlsZENvbmZpZyB8IEFycmF5PCRDaGlsZENvbmZpZz4gPSBjb25maWdzW2tleV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbmZpZykpIHtcbiAgICAgICAgICAvLyDlpoLmnpzlrZDnu4Tku7bmmK/kuIDkuKrliJfooahcbiAgICAgICAgICBsZXQgbWFwID0ge307ICAvLyDkvp3mja7liJfooajkuK3mr4/kuKrlrZDnu4Tku7ZrZXnnlJ/miJDnmoTljp/mnaXnu4Tku7bmmKDlsIRcbiAgICAgICAgICBsZXQgdXNlZCA9IFtdOyAvLyDlrZjmlL7lt7Lnn6XnmoTlrZDnu4Tku7ZrZXnvvIznlKjmnaXmo4DmtYvlpJrkuKrlrZDnu4Tku7bmmK/lkKbph43lpI3kvb/nlKjlkIzkuIDkuKprZXlcbiAgICAgICAgICBsZXQgbGlzdDogQXJyYXk8Q29tcG9uZW50PiA9IGNoaWxkcmVuW2tleV07XG4gICAgICAgICAgaWYgKGxpc3QgJiYgQXJyYXkuaXNBcnJheShsaXN0KSkge1xuICAgICAgICAgICAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBfbGlzdEtleSA9IGl0ZW0uX2xpc3RLZXk7XG4gICAgICAgICAgICAgIGlmIChfbGlzdEtleSB8fCBfbGlzdEtleSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG1hcFtfbGlzdEtleV0gPSBpdGVtO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGlzdCA9IFtdO1xuICAgICAgICAgIGNvbmZpZy5mb3JFYWNoKChjOiAkQ2hpbGRDb25maWcsIGxpc3RJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoX19ERVZfXyAmJiBjLmtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybihgXCIke3RoaXMubmFtZX1cIueahOWtkOe7hOS7tlwiJHtrZXl9XCLliJfooajpobnlv4XpobvljIXlkKtcImtleVwi5bGe5oCn5a6a5LmJYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgY29tO1xuICAgICAgICAgICAgbGV0IGNoaWxkS2V5ID0gYy5rZXkgIT09IG51bGwgJiYgYy5rZXkgIT09IHVuZGVmaW5lZCA/IFN0cmluZyhjLmtleSkgOiAnJztcbiAgICAgICAgICAgIGlmIChjaGlsZEtleSAmJiBtYXAuaGFzT3duUHJvcGVydHkoY2hpbGRLZXkpKSB7XG4gICAgICAgICAgICAgIGlmICh1c2VkLmluZGV4T2YoY2hpbGRLZXkpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGNvbSA9IG1hcFtjaGlsZEtleV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIG1hcFtjaGlsZEtleV07XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoX19ERVZfXykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgXCIke3RoaXMubmFtZX1cIueahOWtkOe7hOS7tlwiJHtrZXl9XCLliJfooajpobnlv4XpobtcImtleVwi5bGe5oCn5a6a5LmJ5Y+R546w6YeN5aSN5YC877yaXCIke2NoaWxkS2V5fVwiYCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdXNlZC5wdXNoKGNoaWxkS2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLl91cGRhdGVDaGlsZChrZXksIGNvbSwgYywgbGlzdEluZGV4KSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyDplIDmr4HmsqHmnInnlKjlpITnmoTlrZDnu4Tku7ZcbiAgICAgICAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goKGspID0+IHtcbiAgICAgICAgICAgIHV0aWxzLmNhbGxMaWZlY3ljbGUobWFwW2tdLCAnb25VbmxvYWQnKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNoaWxkcmVuW2tleV0gPSB7IF9jaGlsZHJlbjogX2tleUJ5KGxpc3QsIGNvbSA9PiBjb20uX2xpc3RLZXkpIH07XG4gICAgICAgICAgLy8g5a2Q57uE5Lu25YiX6KGo5pu05paw5ZCO77yM57uf5LiA5pu05paw5YiX6KGo5a+55bqU55qE6aG16Z2i5pWw5o2uXG4gICAgICAgICAgbGV0IG5ld0RhdGEgPSBbXTtcbiAgICAgICAgICBsaXN0LmZvckVhY2goKGNvbSkgPT4ge1xuICAgICAgICAgICAgbmV3RGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgcHJvcHM6IGNvbS5wcm9wcyxcbiAgICAgICAgICAgICAgc3RhdGU6IGNvbS5zdGF0ZSxcbiAgICAgICAgICAgICAgX19rOiBjb20uX2xpc3RLZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCBwYXRoID0gdGhpcy5wYXRoID8gdGhpcy5wYXRoICsgJy4nICsga2V5IDoga2V5O1xuICAgICAgICAgIHRoaXMucGFnZS51cGRhdGVEYXRhKHtcbiAgICAgICAgICAgIFtwYXRoXTogbmV3RGF0YVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIOWtkOe7hOS7tuaYr+WNleS4que7hOS7tu+8jOS4jeaYr+WIl+ihqFxuICAgICAgICAgIGxldCBjb21wb25lbnQ6IENvbXBvbmVudCA9IGNoaWxkcmVuW2tleV07IC8vIOWOn+adpeeahOe7hOS7tlxuICAgICAgICAgIGNoaWxkcmVuW2tleV0gPSB0aGlzLl91cGRhdGVDaGlsZChrZXksIGNvbXBvbmVudCwgY29uZmlnKTtcbiAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlrZDnu4Tku7bljp/mnaXlsLHlrZjlnKjvvIzliJnmm7TlkI7oh6rliqjmm7TmlrDpobXpnaLmlbDmja5cbiAgICAgICAgICAgIGxldCBuZXdEYXRhID0ge307XG4gICAgICAgICAgICBuZXdEYXRhW2NvbXBvbmVudC5wYXRoICsgJy5wcm9wcyddID0gY29tcG9uZW50LnByb3BzO1xuICAgICAgICAgICAgbmV3RGF0YVtjb21wb25lbnQucGF0aCArICcuc3RhdGUnXSA9IGNvbXBvbmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHRoaXMucGFnZS51cGRhdGVEYXRhKG5ld0RhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2NoaWxkcmVuQ29uZmlncyA9IGNvbmZpZ3M7XG4gICAgdGhpcy5fY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cblxuICAvKipcbiAgICog5pu05paw5Y2V5Liq5a2Q57uE5Lu2XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkg57uE5Lu2a2V5XG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICAgKiBAcGFyYW0ge251bWJlcn0gbGlzdEluZGV4XG4gICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfdXBkYXRlQ2hpbGQoa2V5OiBzdHJpbmcsIGNvbXBvbmVudD86IENvbXBvbmVudCwgY29uZmlnOiAkQ2hpbGRDb25maWcsIGxpc3RJbmRleD86IG51bWJlcik6IENvbXBvbmVudCB7XG4gICAgaWYgKGNvbXBvbmVudCkge1xuICAgICAgLy8g5om+5Yiw5LqG5Y6f5pyJ5a6e5L6L77yM5pu05pawcHJvcHNcbiAgICAgIGNvbXBvbmVudC5fc2V0S2V5KGtleSwgdGhpcywgbGlzdEluZGV4LCBjb25maWcua2V5KTtcbiAgICAgIGlmIChjb25maWcucHJvcHMgJiYgdXRpbHMuc2hvdWxkVXBkYXRlKGNvbXBvbmVudC5wcm9wcywgY29uZmlnLnByb3BzKSkge1xuICAgICAgICBsZXQgbmV4dFByb3BzO1xuICAgICAgICBpZiAoY29tcG9uZW50LnByb3BzICYmIGNvbXBvbmVudC5wcm9wcy5tZXJnZSAmJiBjb21wb25lbnQucHJvcHMuYXNNdXRhYmxlKSB7XG4gICAgICAgICAgLy8g5aaC5p6cIHByb3BzLm1lcmdlIOWtmOWcqO+8jOWImeS7o+ihqHByb3Bz5piv5LiA5LiqSW1tdXRhYmxl5a+56LGhXG4gICAgICAgICAgbmV4dFByb3BzID0gY29tcG9uZW50LnByb3BzLm1lcmdlKGNvbmZpZy5wcm9wcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dFByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgY29tcG9uZW50LnByb3BzLCBjb25maWcucHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wb25lbnQub25VcGRhdGUpIHtcbiAgICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgICAgLy8gRGV2ZWxvcG1lbnRcbiAgICAgICAgICAgIGxldCBvcmlnaW5hbCA9IHV0aWxzLmdldERlYnVnT2JqZWN0KGNvbXBvbmVudC5wcm9wcyk7XG4gICAgICAgICAgICBjb21wb25lbnQub25VcGRhdGUobmV4dFByb3BzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCclYyVzIG9uVXBkYXRlKCVvKSAtPiAlbyBDb21wb25lbnQ6JW8nLFxuICAgICAgICAgICAgICAnY29sb3I6IzJhOGY5OScsXG4gICAgICAgICAgICAgIHRoaXMuaWQsIG9yaWdpbmFsLFxuICAgICAgICAgICAgICB1dGlscy5nZXREZWJ1Z09iamVjdChjb21wb25lbnQucHJvcHMpLFxuICAgICAgICAgICAgICBjb21wb25lbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXBvbmVudC5vblVwZGF0ZShuZXh0UHJvcHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb21wb25lbnQucHJvcHMgPSBuZXh0UHJvcHM7XG4gICAgICAgIGNvbXBvbmVudC5fdXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOayoeacieaJvuWIsOWOn+acieWunuS+i++8jOWunuS+i+WMluS4gOS4quaWsOeahFxuICAgICAgbGV0IENvbXBvbmVudENsYXNzID0gY29uZmlnLmNvbXBvbmVudDtcbiAgICAgIGNvbXBvbmVudCA9IG5ldyBDb21wb25lbnRDbGFzcyhjb25maWcucHJvcHMpO1xuICAgICAgY29tcG9uZW50Ll9jb25maWcgPSBjb25maWc7XG4gICAgICBjb21wb25lbnQuX2luaXQoa2V5LCB0aGlzLCBsaXN0SW5kZXgsIGNvbmZpZy5rZXkpO1xuICAgIH1cbiAgICByZXR1cm4gY29tcG9uZW50O1xuICB9XG59XG5cbiJdfQ==