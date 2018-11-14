import React, { Component } from 'react';
import pt from 'prop-types';
import { connect } from '../store';
import bookModel from '../bookModel';
import model from './model';

let n = 0;

class UserList extends Component {
  static propTypes = {
    users: pt.array.isRequired,
  }

  constructor(props) {
    super(props);
    setInterval(() => {
      n += 1;
      bookModel.book(`Book-${n}`);
    }, 2000);
  }

  renderUsers = () => {
    const { users } = this.props;
    if (Object.is(users.length, 0)) {
      return (
        <section>
          no users
        </section>
      );
    }
    const list = users.map((user, index) => (
      /* eslint-disable react/no-array-index-key */
      <section
        key={index}
      >
        <div className="row">
          <h4>
            user
            {' '}
            {index}
            :
          </h4>
          <p>
            name:
            {user.name}
          </p>
          <p>
            profession：
            {user.profession}
          </p>
          <p>
            pet:
            {user.pet}
          </p>
        </div>
      </section>
    ));
    return list;
  }

  render() {
    console.log(`render ${n}`);
    return (
      <section>
        { this.renderUsers() }
      </section>
    );
  }
}

export default connect(model)(UserList);
