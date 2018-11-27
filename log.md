### react-glue-redux更新日志 | [en](https://github.com/ZhouYK/react-glux/blob/master/en/log.md)
1.0.0
- initial version

1.1.0
- connect方法重构;
> 第一个入参类型必须是plain object，未找到的节点值为undefined。

1.1.1
- connect方法中，组件一进入就注册监听store变化

1.1.2
- connect中，将注册监听放在constructor中

1.1.3
- ts声明文件更新

1.1.4
- connect中，除了监听的model发生改变会触发更新外，外部传入的props发生改变，也会触发更新

1.2.0,1.2.1-alpha.0
- 添加测试代码

1.3.0
- 调整package.json的main路径由指向es文件变为cjs文件
