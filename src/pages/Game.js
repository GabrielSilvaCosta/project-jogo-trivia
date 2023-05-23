import React, { Component } from 'react';
import { getQuest } from '../services/getApi';

export default class Game extends Component {
  state = {
    questions: [],
    currentQuestionIndex: 0,
  };

  async componentDidMount() {
    const response = await getQuest();
    if (response && response.length > 0) {
      const questions = response.map((question) => ({
        ...question,
        options: this.shuffleOptions(this.getOptions(question)),
      }));
      this.setState({ questions });
    }
  }

  getOptions = (question) => {
    if (question.type === 'boolean') {
      return [question.correct_answer, 'True'];
    }
    return [question.correct_answer, ...question.incorrect_answers];
  };

  shuffleOptions = (options) => {
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    return shuffledOptions;
  };

  handleNextQuestion = () => {
    this.setState((prevState) => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
    }));
  };

  render() {
    const { questions, currentQuestionIndex } = this.state;

    if (questions.length === 0) {
      return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
      <>
        <div>Game</div>
        <div data-testid="question-category">{currentQuestion.category}</div>
        <div data-testid="question-text">{currentQuestion.question}</div>
        <div data-testid="answer-options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={ index }
              data-testid={ index === 0 ? 'correct-answer' : `wrong-answer-${index - 1}` }
            >
              {option}
            </button>
          ))}
        </div>
        <button onClick={ this.handleNextQuestion }>Next Question</button>
      </>
    );
  }
}
