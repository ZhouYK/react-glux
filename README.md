# react-glux | [en](https://github.com/ZhouYK/react-glue-redux/blob/master/en)

链接react组件与redux store
> 基于glue-redux，根据model引用自动更新react组件，并传入this.props.model作为组件数据源

## 查看示例
```javascript
git clone https://github.com/ZhouYK/react-glue-redux.git
npm install
npm start

然后访问 http://localhost:8888
```


## destruct(store)(model) | [代码](https://github.com/ZhouYK/react-glue-redux/blob/master/example/configStore.js)

### 入参
- store(必传)
  > redux的生成的store对象
- model(必传)
  > 定义的数据对象，必须是对象类型
  
### 返回
- { reducers, connect }
  > 包含reducers和connect属性的对象
  
   - reducers
      > redux中的reducer函数的对象集合，可直接用户combineReducers
   - connect [代码](https://github.com/ZhouYK/react-glue-redux/blob/master/example/App/UserList.jsx)
      > 链接store与组件，帮助组件实时获取数据，向组件注入model属性


## Author
[ZhouYK](https://github.com/ZhouYK)

## License
[MIT licensed](https://github.com/ZhouYK/react-glue-redux/blob/master/LICENSE) 
