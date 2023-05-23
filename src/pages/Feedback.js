import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Feedback extends Component {
  renderFeedbackMessage() {
    const { score } = this.props;
    const number = 3;

    if (score < number) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    return (
      <div>
        <h1>Feedback</h1>
        <div data-testid="feedback-text">{this.renderFeedbackMessage()}</div>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
