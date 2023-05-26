import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
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
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(withRouter(Feedback));
