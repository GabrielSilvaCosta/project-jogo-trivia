import { REQUEST_SUCCESSFUL } from './actionType';

export const SAVE_NAME = 'SAVE_NAME';
export const saveName = (name, email) => ({
  type: SAVE_NAME,
  name,
  email,
});
export const requestSuccessful = (data) => ({
  type: REQUEST_SUCCESSFUL,
  payload: data,
});
export const getCurrencys = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  return data.token;
};
