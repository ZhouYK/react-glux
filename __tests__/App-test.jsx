import React from 'react';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import App from '../example/App';
import UserListHOC, { Index as UserList } from '../example/App/UserList';
import bookModel from '../example/models/book/model';
import service from '../example/models/app/service';

configure({
  adapter: new Adapter(),
});

// 测试原则基于组件的shouldComponentUpdate方法
// 如果无关的model更新，那么hoc和消费组件都不会引起shouldComponentUpdate，也不会rerender
const ifModelNoChangeNoRerender = 'bookModel(with no relation) updated, UserListHOC and UserList should not update';
test(ifModelNoChangeNoRerender, () => {
  const component = mount(<UserListHOC />);
  const spyUserList = sinon.spy(UserList.prototype, 'shouldComponentUpdate');
  const spyUserListHOC = sinon.spy(UserListHOC.prototype, 'shouldComponentUpdate');
  // update bookModel
  bookModel.book(['《挪威的森林》']);
  expect(spyUserList.calledOnce).toBeFalsy();
  expect(spyUserListHOC.calledOnce).toBeFalsy();
  spyUserList.restore();
  spyUserListHOC.restore();
  component.unmount();
});
// 被追踪的model更新，那么相关的hoc和消费组件都会rerender
const ifModelChangeDoRerender = 'shouldComponentUpdate: UserListHOC calledOnce, UserList calledOnce';
test(ifModelChangeDoRerender, () => {
  const component = mount(<UserListHOC />);
  const spyUserList = sinon.spy(UserList.prototype, 'shouldComponentUpdate');
  const spyUserListHOC = sinon.spy(UserListHOC.prototype, 'shouldComponentUpdate');
  service.register({
    name: '小张',
    profession: '程序员',
    pet: '狗',
  });
  expect(spyUserListHOC.calledOnce).toBeTruthy();
  expect(spyUserList.calledOnce).toBeTruthy();
  spyUserList.restore();
  spyUserListHOC.restore();
  component.unmount();
});
// 父组件设置属性更新，但值未变，父组件会触发shouldComponentUpdate，并且rerender；
// 子组件HOC不触发rerender，但会触发shouldComponentUpdate
// 子组件不会触发shouldComponentUpdate和rerender

const ifPropsNoChangeNoRerender = 'shouldComponentUpdate: App calledOnce, UserListHOC calledOnce, UserList none';
test(ifPropsNoChangeNoRerender, () => {
  const component = mount(<App test={ifPropsNoChangeNoRerender} />);
  const spyApp = sinon.spy(App.prototype, 'shouldComponentUpdate');
  const spyUserListHOC = sinon.spy(UserListHOC.prototype, 'shouldComponentUpdate');
  const spyUserList = sinon.spy(UserList.prototype, 'shouldComponentUpdate');
  component.setProps({
    test: ifPropsNoChangeNoRerender,
  });
  expect(spyApp.calledOnce).toBeTruthy();
  expect(spyUserListHOC.calledOnce).toBeTruthy();
  expect(spyUserList.calledOnce).toBeFalsy();
  spyApp.restore();
  spyUserList.restore();
  spyUserListHOC.restore();
  component.unmount();
});

// 父组件属性值变更，父组件触发shouldComponentUpdate和rerender;
// 子组件HOC会触发shouldComponentUpdate并且rerender;
// 子组件会触发shouldComponentUpdate并且rerender
const ifPropsChangeDoRerender = 'shouldComponentUpdate: App calledOnce, UserListHOC calledOnce, UserList calledOnce';
test(ifPropsChangeDoRerender, () => {
  const component = mount(<App />);
  const spyApp = sinon.spy(App.prototype, 'shouldComponentUpdate');
  const spyUserList = sinon.spy(UserList.prototype, 'shouldComponentUpdate');
  const spyUserListHOC = sinon.spy(UserListHOC.prototype, 'shouldComponentUpdate');
  component.setProps({
    test: ifPropsChangeDoRerender,
  });
  expect(spyApp.calledOnce).toBeTruthy();
  expect(spyUserListHOC.calledOnce).toBeTruthy();
  expect(spyUserList.calledOnce).toBeTruthy();
  spyApp.restore();
  spyUserList.restore();
  spyUserListHOC.restore();
  component.unmount();
});
