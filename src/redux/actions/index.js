export const SAVE_NAME = 'SAVE_NAME';

export const saveName = (name, email) => ({
  type: SAVE_NAME,
  name,
  email,
});
