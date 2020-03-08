import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import api from '../../services/api';
// import { Container } from './styles';

class User extends Component {
  state = {
    stars: [],
  };

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.string,
      }),
    }).isRequired,
  };

  async componentDidMount() {
    const { route } = this.props;

    const { user } = route.params;

    const response = await api.get(`users/${user.login}/starred`);

    this.setState({ stars: response.data });
  }

  render() {
    const { stars } = this.state;

    return <View />;
  }
}

export default User;
