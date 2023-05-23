import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  renderFeedbackMessage() {
    const { score } = this.props;

    if (score < 3) {
      return 'Could be better...';
    } else {
      return 'Well Done!';
    }
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

const mapStateToProps = state => {
  return {
    score: state.player.score
  };
};

export default connect(mapStateToProps)(Feedback);
