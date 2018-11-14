# react-glux

glue-redux的连接库
> 基于glue-redux的react链接库

## 查看示例
```bash
git clone https://github.com/ZhouYK/react-glux.git
npm install
npm start

然后访问 http://localhost:8888
```

## Api
* destruct

## destruct(store)(model) | [代码](https://github.com/ZhouYK/react-glux/blob/master/example/configStore.js)

### 入参
- store(必传)
  > redux的生成的store对象
- model(必传)
  > 自定义的数据对象，必须是plain object
  
### 返回
- { reducers, connect }
  > 包含reducers和connect属性的对象
  
   - reducers
      > redux中的reducer函数的对象集合，可直接用户combineReducers
   - connect [代码](https://github.com/ZhouYK/react-glux/blob/master/example/App/UserList.jsx)
      > HOC---链接store与组件，帮助组件实时获取数据，向组件注入数据

### 如何使用
```js
  // store.js
  import {
    createStore, combineReducers,
  } from 'redux';
  import app from './model';
  import { destruct } from 'react-glux';
  
  const store = createStore(() => {});
  const { reducers, connect } = destruct(store)({ app });
  store.replaceReducer(combineReducers(reducers));
  
  export {
    store,
    connect, // 导出连接React组件的HOC
  };

```
### connect(model)(Component)
* model {:&.rollIn}
> 必须是对象，从state拿到的数据将以该对象的展开结构注入组件

* Component
> react组件

### 如何使用

* 先定义数据模型

```js
 // model.js
 import { gluer } from 'glue-redux';
 
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
