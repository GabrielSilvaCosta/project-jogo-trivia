import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const userData = JSON.parse(localStorage.getItem('ranking'));
    const dataSorted = userData ? [...userData]
      .sort((first, second) => second.score - first.score) : [];

    return (
      <div>
        <div>
          <h1 data-testid="ranking-title">Ranking</h1>
          {
            dataSorted.map((user, index) => (
              <div key={ user.name }>
                <img src={ user.picture } alt={ user.name } />
                <span data-testid={ `player-name-${index}` }>{user.name}</span>
                <span data-testid={ `player-score-${index}` }>
                  {user.score}
                  {' '}
                  pontos
                </span>
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
