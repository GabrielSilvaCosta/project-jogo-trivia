import React from 'react';
import { fireEvent } from '@testing-library/react';
import Feedback from '../../pages/Feedback';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Feedback component', () => {
  test('renders feedbacks and handles play again', () => {
    const mockState = {
      player: {
        score: 5,
        assertions: 3,
      },
    };

    const { getByTestId, history } = renderWithRouterAndRedux(
      <Feedback />,
      mockState,
      '/Feedback'
    );

    const totalScoreElement = getByTestId('feedback-total-score');
    expect(totalScoreElement).toHaveTextContent('5');

    const totalQuestionElement = getByTestId('feedback-total-question');
    expect(totalQuestionElement).toHaveTextContent('3');

    const playAgainButton = getByTestId('btn-play-again');
    fireEvent.click(playAgainButton);

    expect(history.location.pathname).toBe('/');
  });

  test('displays "Could be better..." feedback message', () => {
    const mockState = {
      player: {
        score: 5,
        assertions: 2,
      },
    };

    const { getByTestId } = renderWithRouterAndRedux(
      <Feedback />,
      mockState,
      '/Feedback'
    );

    const feedbackTextElement = getByTestId('feedback-text');
    expect(feedbackTextElement).toHaveTextContent('Could be better...');
  });

  test('displays "Well Done!" feedback message', () => {
    const mockState = {
      player: {
        score: 5,
        assertions: 5,
      },
    };

    const { getByTestId } = renderWithRouterAndRedux(
      <Feedback />,
      mockState,
      '/Feedback'
    );

    const feedbackTextElement = getByTestId('feedback-text');
    expect(feedbackTextElement).toHaveTextContent('Well Done!');
  });
});
