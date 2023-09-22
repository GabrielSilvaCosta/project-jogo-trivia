/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { saveName } from '../redux/actions/index';

class Ranking extends React.Component {
  componentDidMount() {
    const { player, score, gravatar } = this.props;
    const profile = {
      urlImage: `https://www.gravatar.com/avatar/${gravatar}`,
      player,
      score,
    };
    const localStorageData = localStorage.getItem('Ranking');
    const profileList = localStorageData ? JSON.parse([localStorageData]) : [];
    profileList.push(profile);
    saveName(profileList);
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const userData = JSON.parse(localStorage.getItem('Ranking'));
    const dataSorted = userData ? [...userData]
      .sort((first, second) => second.score - first.score) : [];

    return (
      <div>
        <Header />
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          {
            dataSorted.map((user, index) => (
              <div key={ user.name }>
                <img src={ user.picture } alt={ user.name } />
                <p data-testid={ `player-name-${index}` }>{user.name}</p>
                <p>
                  {' '}
                  data-testid=
                  { `player-score-${index}` }
                  {user.score}
                  {' '}
                  pontos
                </p>
              </div>
            ))
          }
          <button data-testid="btn-go-home" onClick={ this.handleClick }>
            Jogar Novamente
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
