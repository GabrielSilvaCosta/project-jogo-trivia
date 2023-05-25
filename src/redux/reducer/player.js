import { SAVE_NAME } from '../actions';
import { SAVE_SCORE } from '../actions/actionType';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  imgUrl: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case (SAVE_NAME):
    return ({ ...state, ...action.payload });
  case (SAVE_SCORE):
    return ({ ...state, score: action.payload });

  default: return state;
  }
};

export default playerReducer;
