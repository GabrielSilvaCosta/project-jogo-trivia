import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import Ranking from '../../pages/Ranking';

describe('Ranking Component', () => {
  it('testa a exibição dos nomes e pontuações dos jogadores', () => {
    const userData = [
      { name: 'Player 1', score: 100 },
      { name: 'Player 2', score: 200 },
      { name: 'Player 3', score: 150 },
    ];
    localStorage.setItem('ranking', JSON.stringify(userData));

    renderWithRouterAndRedux(<Ranking />);

    const playerNames = screen.getAllByTestId(/^player-name-/);
    const playerScores = screen.getAllByTestId(/^player-score-/);

    expect(playerNames.length).toBe(userData.length);
    expect(playerScores.length).toBe(userData.length);

    // playerNames.forEach((playerName, index) => {
    //   expect(playerName).toHaveTextContent(userData[index].name);
    // });

    // playerScores.forEach((playerScore, index) => {
    //   expect(playerScore).toHaveTextContent(`${userData[index].score} pontos`);
    // });
  });

  it('testa a interação do botão "Jogar Novamente"', () => {
    const historyMock = { push: jest.fn() };
    renderWithRouterAndRedux(<Ranking history={historyMock} />);

    const playAgainButton = screen.getByTestId('btn-go-home');
    userEvent.click(playAgainButton);

    expect(historyMock.push).toHaveBeenCalledWith('/');
  });
});