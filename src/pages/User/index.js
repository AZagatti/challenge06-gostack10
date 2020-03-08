import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
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
    loading: true,
    page: 1,
    refreshing: false,
  };

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({
          login: PropTypes.string,
          avatar: PropTypes.string,
          name: PropTypes.string,
          bio: PropTypes.string,
        }),
      }),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const { stars } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`users/${user.login}/starred`, {
      params: { page },
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  };

  loadMore = async () => {
    const { page } = this.state;

    const nextPage = page + 1;

    this.load(nextPage);
  };

  refreshList = async () => {
    this.setState({ refreshing: true }, this.load);
  };

  handleNavigate = repository => {
    const { navigation } = this.props;

    navigation.navigate('Repository', { repository });
  };

  render() {
    const { route } = this.props;
    const { stars, loading, refreshing } = this.state;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#ccc" size={80} />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}

export default User;
