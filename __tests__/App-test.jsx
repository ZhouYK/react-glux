import React from 'react';
import renderer from 'react-test-renderer';
import App from '../example/App';
import UserList from '../example/App/UserList';
import bookModel from '../example/bookModel';
import service from '../example/App/service';

// 测试原则基于组件的shouldComponentUpdate方法
const ifModelNoChangeNoRerender = 'bookModel update, UserList should not update';
test(ifModelNoChangeNoRerender, () => {
  const testRenderer = renderer.create(
    <UserList test={ifModelNoChangeNoRerender} />,
  );
  // update bookModel
  bookModel.book(['《挪威的森林》']);
  testRenderer.unmount();
});
const ifModelChangeDoRerender = 'UserList should rerender';
test(ifModelChangeDoRerender, () => {
  const testRenderer = renderer.create(
    <UserList test={ifModelChangeDoRerender} />,
  );
  service.register({
    name: '小张',
    profession: '程序员',
    pet: '狗',
  });
  const tree = testRenderer.toJSON();
  expect(tree).toMatchSnapshot();
  testRenderer.unmount();
});
const ifPropsNoChangeNoRerender = 'App should rerender but UserList';
test(ifPropsNoChangeNoRerender, () => {
  const testRenderer = renderer.create(
    <App test={ifPropsNoChangeNoRerender} />,
  );
  // update app
  testRenderer.update(<App test={ifPropsNoChangeNoRerender} />);
  testRenderer.unmount();
});

const ifPropsChangeDoRerender = 'App and UserList both should rerender';
test(ifPropsChangeDoRerender, () => {
  const testRenderer = renderer.create(
    <App />,
  );
  testRenderer.update(<App test={ifPropsChangeDoRerender} />);
  testRenderer.unmount();
});
