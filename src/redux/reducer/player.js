import { SAVE_NAME } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: '',
    gravatarEmail: '',
    imgUrl: '',
  },
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case (SAVE_NAME):
    return ({ ...state, ...action.payload });
  default: return state;
  }
};

export default playerReducer;
