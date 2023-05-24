import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { player } = this.props;
    console.log(player.name);

    return (
      <div>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ player.imgUrl }
            alt="user icon"
          />
          <p data-testid="header-player-name">{ player.name }</p>
        </div>
        <div>
          Pontos:
          {' '}
          <span
            data-testid="header-score"
          >
            { player.score }

          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.playerReducer,
});

Header.propTypes = {
  player: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps)(Header);
