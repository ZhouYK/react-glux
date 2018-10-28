# react-glue-redux | [中文](https://github.com/ZhouYK/react-glue-redux)

link the react component to the redux store
> based on gly-redux, the react component is automatically updated based on the model reference and passed into the this.props. Model as the component data source

## see the sample
```javascript
git clone https://github.com/ZhouYK/react-glue-redux.git
npm install
npm start

then visit http://localhost:8888
```


## destruct(store)(model) | [code](https://github.com/ZhouYK/react-glue-redux/blob/master/example/configStore.js)

### the ginseng
- store(necessary)
  > the generated store object for redux
- model(necessary)
  > the data object defined must be an object type
  
### return
- { reducers, connect }
  > object that contains the reducers and connect properties
  
   - reducers
      > object set for the reducer function in redux, which allows direct user combineReducers
   - connect [code](https://github.com/ZhouYK/react-glue-redux/blob/master/example/App/UserList.jsx)
      > link store with components to help components get data in real time and inject model properties into components


## Author
[ZhouYK](https://github.com/ZhouYK)

## License
[MIT licensed](https://github.com/ZhouYK/react-glue-redux/blob/master/LICENSE) 
