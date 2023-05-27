import { SAVE_NAME } from '../actions';
import { SAVE_SCORE, SAVE_ASSERTIONS } from '../actions/actionType';

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
  case (SAVE_ASSERTIONS):
    return ({ ...state, assertions: action.payload });
  default: return state;
  }
};

export default playerReducer;
