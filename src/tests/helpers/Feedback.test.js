import React from 'react';
import { fireEvent } from '@testing-library/react';
import Feedback from '../../pages/Feedback';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Feedback component', () => {
  test('renderiza feedBacks', () => {
    const initialState = {
      playerReducer: {
        score: 5,
        assertions: 3,
      },
    };

    // Simula um valor válido para userData
    const rankingData = [
      { name: 'John', score: 10 },
      { name: 'Jane', score: 8 },
    ];
    localStorage.setItem('ranking', JSON.stringify(rankingData));

    const { getByTestId, history } = renderWithRouterAndRedux(
      <Feedback />,
      initialState,
      '/feedback'
    );

    const totalScoreElement = getByTestId('feedback-total-score');
    expect(totalScoreElement).toHaveTextContent('5');

    const totalQuestionElement = getByTestId('feedback-total-question');
    expect(totalQuestionElement).toHaveTextContent('3');


    const playAgainButton = getByTestId('btn-play-again');
    fireEvent.click(playAgainButton);

    expect(history.location.pathname).toBe('/');
  });
});
