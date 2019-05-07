# react-glue-redux

glue-redux的连接库
> 基于glue-redux的react连接库

## 安装
```bash
npm i react-glue-redux -P
# 包原名为react-glux，1.3.1版本后react-glux改名为react-glue-redux
```

## 查看示例
```bash
git clone https://github.com/ZhouYK/react-glux.git
npm install
npm start

然后访问 http://localhost:8888
```

## Api
* destruct

## destruct(store)(models) | [代码](https://github.com/ZhouYK/react-glux/blob/master/example/configStore.js)

### 入参

| 参数名 | 类型 | 用途 | 示例
| :----: | :----: | :----: | :----:
| store | object(redux的store) | 耦合数据模型 | -
| models | object | 数据模型 | { [index: string]: GluerReturn or any }
  
### 返回
- { reducers, connect }

 | 属性名 | 类型 | 用途 | 示例 
 | :----: | :----: | :----: | :----:
 | reducers | object | reducer组成的对象 | { name: (state, action) => {}, ... } 
 | connect | function | HOC | connect(model)(Component)

### 如何使用
```js
  // store.js
  import {
    createStore, combineReducers,
  } from 'redux';
  import app from './model';
  import { destruct } from 'react-glue-redux';
  
  const store = createStore(() => {});
  const { reducers, connect } = destruct(store)({ app });
  store.replaceReducer(combineReducers(reducers));
  
  export {
    store,
    connect, // 导出连接React组件的HOC
  };

```
### 如何使用

* 先定义数据模型

```js
 // model.js
 import { gluer } from 'react-glue-redux';
 
 const users = gluer((data, state) => [data, ...state], []);
 
 const app = {
   users,
 };
 export default app;

```

* 在组件中注入数据

```jsx
  // UserList.jsx
  import React, { Component } from 'react';
  import pt from 'prop-types';
  import { connect } from './store';
  import model from './model';
  
  class UserList extends Component {
    static propTypes = {
      users: pt.array.isRequired,
    }
  
    renderUsers = () => {
     ...
    }
  
    render() {
      return (
        <section>
          { this.renderUsers() }
        </section>
      );
    }
  }
  
  export default connect(model)(UserList);// model的结构为{ users }，注入组件的属性则为this.props.users

```
## Author
[ZhouYK](https://github.com/ZhouYK)

## License
[MIT licensed](https://github.com/ZhouYK/react-glux/blob/master/LICENSE) 
