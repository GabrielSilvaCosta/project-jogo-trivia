import { REQUEST_SUCCESSFUL, SAVE_SCORE, SAVE_ASSERTIONS } from './actionType';

export const SAVE_NAME = 'SAVE_NAME';

export const saveName = (data) => ({
  type: SAVE_NAME,
  payload: data,
});

export const requestSuccessful = (data) => ({
  type: REQUEST_SUCCESSFUL,
  payload: data,
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  payload: score,
});

export const saveAssertions = (assertions) => ({
  type: SAVE_ASSERTIONS,
  payload: assertions,
});

export const getCurrencys = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
};
