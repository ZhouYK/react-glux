import React, { Component } from 'react';
import pt from 'prop-types';
import { connect } from '../configStore';
import model from '../glue/model';

class UserList extends Component {
  static propTypes = {
    manyPeople: pt.object.isRequired,
  }

  renderUsers = () => {
    const { manyPeople: { users } } = this.props;
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
    return (
      <section>
        { this.renderUsers() }
      </section>
    );
  }
}

export default connect({ manyPeople: model })(UserList);
