import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Header from '../components/Header';
import Game from './Game';
import Ranking from './Ranking';

class Feedback extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/'); // Altere para a rota correta para ir à tela de login
  };

  renderFeedbackMessage() {
    const { score } = this.props;
    const number = 3;

    if (score < number) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    const { score, assertions } = this.props;

    return (
      <div>
        <Header />
        <Game />
        <h1>Feedback</h1>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
        <div data-testid="feedback-text">{this.renderFeedbackMessage()}</div>
        <button
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgain }
        >
          Play Again
        </button>
        {/* ao clicar no link a pessoa vai ser rendirecionada para tela de Ranking */}
        <Link to="/Ranking" data-testid="btn-ranking">
          Ranking
        </Link>
        <Ranking />
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.playerReducer.score,
  assertions: state.playerReducer.assertions,
});

export default connect(mapStateToProps)(withRouter(Feedback));
