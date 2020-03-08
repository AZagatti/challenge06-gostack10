import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

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
    const { route } = this.props;
    const { stars } = this.state;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}

export default User;
