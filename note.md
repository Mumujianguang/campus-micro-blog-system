# 学习笔记


## 深入认识setState
```js
this.setState(object/func, callback);
```
### setState: 对状态的改变**可能是异步**的
- 如果要改变的状态处于某个HTML元素的事件中，则是异步的，否则是同步的

- React的优化：多次异步的setState会进行合并，最终只触发一次render函数

- 回调函数在render函数之后运行

### 最佳实践：
- 把所有的setState当作是异步的
- 如果要使用改变之后的状态，需要在回调函数中访问(setState的第二个参数)
- 如果存在多次setState调用，并且每次都要使用最新的状态进行运算，则应该使用函数的方式(setState的第一个参数)



## 生命周期

### 旧版生命周期 < React 16.0.0

#### 挂载阶段
1. constructor -- 构造函数

2. componentWillMount -- 组件被挂载之前 (**在新版生命周期中被移除**)

3. render -- 将返回的React元素挂载到虚拟Dom树上，进行页面渲染，生成真实Dom
    - render中严禁使用 **setState** 会导致递归渲染 

4. componentDidMount -- 组件挂载完成
    - 只会执行一次
    - 适用于在此阶段中发起ajax请求等操作

#### 更新阶段
1. componentWillReceiveProps -- props发生改变时(即使属性被赋相同的值也会触发) (**在新版生命周期中被移除**)
    - 参数是新的props对象
    - 可能会导致bug，不推荐适用

2. shouldComponentUpdate(nextProps, nextState) -- 指示React是否重新渲染该组件(**性能优化点**)
    - 参数是新的props和state 
    - 返回值true/false指示React是否重新渲染该组件
    - 不写该函数，则默认返回true 

3. componentWillUpdate(nextProps, nextState) -- 组件即将重新渲染 (**在新版生命周期中被移除**)
    - 参数是新的props和state 

4. render

5. componentDidUpdate(prevProps, prevState) -- 组件更新完成
    - 参数是更新之前的props和state

#### 销毁阶段
- componentWillUnmount -- 组件被销毁
    - 通常在该函数中销毁一些组件依赖的资源



### 新版生命周期 >= React 16.0.0
- constructor

- static getDerivedStateFromProps -- props和state发生改变时触发
    - 参数是新的属性和状态   
    - 静态函数，访问不了this
    - 该函数的返回值会覆盖掉组件的状态

- **shouldComponentUpdate**

- **render**

- **componentDidMount**

- getSnapshotBeforeUpdate -- 真实Dom构建完成，但还没有渲染完成
    - 参数是之前的属性和状态
    - 通常该函数用于实现一些附加的Dom操作
    - 该函数要和componentDidMount一起使用
    - 该函数的返回值会作为componentDidMount函数的第三个参数

- componentDidUpdate

- **componentWillUnmount**


### 自定义组件传递内容
```js
class Comp extends React.Component {
    render () {
        return (
            <div>{ props.children }</div>
        )
    }
}

<Comp>123</Comp>
```

### Redux核心概念

#### action
1. action是一个plain-object(平面对象)，即 __proto__: Object.prototype

2. action中必须有type属性，用于描述操作的类型

3. 在大型项目中，由于操作类型非常多，为了避免硬编码，会将操作类型写在一个单独的文件中

4. 为了方便传递action，通常会使用action创建函数来创建action
    - action创建函数应该为纯函数
    - 不能有异步
    - 不能修改参数
    - 不能对外部数据产生影响

5. 为了方便利用action创建函数来分发action，redux提供了一个bindActionCreator来为action创建函数附加自动分发功能
#### reducer

#### store