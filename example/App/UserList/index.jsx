import React, { Component } from 'react';
import pt from 'prop-types';
import { connect } from '../../store';
import model from '../../models/app/model';

class Index extends Component {
  static propTypes = {
    users: pt.array.isRequired,
    test: pt.string,
  }

  static defaultProps = {
    test: 'userlist component',
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    console.log(nextProps.test);
    return true;
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
    return (
      <section>
        <span>
          { this.props.test }
        </span>
        { this.renderUsers() }
      </section>
    );
  }
}

export default connect({ ...model, test: 1 })(Index);
