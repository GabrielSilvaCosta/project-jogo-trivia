import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { saveScore } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    clicked: false,
    questionIndex: 0,
    time: 30,
    score: 0,
  };

  componentDidMount() {
    this.requestQuestions();
    this.startTimer();
  }

  startTimer = () => {
    const number = 1000;
    const { timerInterval } = this;
    this.timerInterval = setInterval(() => {
      this.setState(({ time: prevTime }) => ({
        time: prevTime - 1,
      }), () => {
        const { time: atualTime } = this.state;
        if (atualTime === 0) {
          clearInterval(timerInterval);
          this.disableButtons();
        } else if (atualTime < 0) {
          this.setState({ time: 0 });
        }
      });
    }, number);
  };

  resetTimer = () => {
    this.setState({ time: 30 });
  };

  disableButtons = () => {
    this.setState({ clicked: true });
  };

  requestQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      if (data.results.length === 0) {
        localStorage.clear();
        return history.push('/');
      }
      const questions = data.results.map((question) => {
        const options = [question.correct_answer, ...question.incorrect_answers];
        const shuffledOptions = this.shuffleArray(options);
        question.options = shuffledOptions;
        return question;
      });
      this.setState({ questions, clicked: false });
    } catch (error) {
      console.error('Faça login novamente!', error);
      localStorage.clear();
      return history.push('/');
    }
  };

  renderButtonClick = () => {
    const { clicked } = this.state;
    if (clicked) {
      return (
        <button data-testid="btn-next" onClick={ this.nextButtonClick }>Next</button>
      );
    }
  };

  calcScore = (option) => {
    const number = 10;
    const { questionIndex, questions, time } = this.state;
    const { dispatch } = this.props;
    const { correct_answer: correct, difficulty } = questions[questionIndex];
    if (correct === option) {
      const timerScore = time * this.getDifficultyMultiplier(difficulty);
      console.log(timerScore);
      const questionScore = number + timerScore;
      this.setState(
        (prevState) => ({
          questionIndex: prevState.questionIndex + 1,
          clicked: true,
          score: prevState.score + questionScore,
        }),
        () => {
          const { score } = this.state;
          dispatch(saveScore(score));
        },
      );
    }
  };

  nextButtonClick = () => {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      clicked: false,
    }));
    this.resetTimer();
  };

  getDifficultyMultiplier = (difficulty) => {
    const there = 3;
    switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return there;
    default:
      return 1;
    }
  };

  shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  render() {
    const { questions, clicked, questionIndex, time, score } = this.state;
    if (questions.length === 0) {
      return <div data-testid="loading">Loading...</div>;
    }
    if (questionIndex >= questions.length) {
      const { history } = this.props;
      history.push('/Feedback');
    }
    const currentQuestion = questions[questionIndex];
    if (!currentQuestion) {
      return <div>Loading question...</div>; // Handle the case when currentQuestion is undefined
    }
    const {
      category, question, options, correct_answer: correct,
    } = currentQuestion;
    return (
      <div>
        <Header />
        <div>
          <div data-testid="timer">
            Tempo:
            {' '}
            {time}
          </div>
          {time === 0 && (
            <div>Tempo esgotado!</div>
          )}
          <div>
            <p data-testid="question-category">{category}</p>
            <p data-testid="question-text">{question}</p>
            <div data-testid="answer-options">
              {options.map((option, optionIndex) => {
                if (option === correct) {
                  return (
                    <button
                      key={ optionIndex }
                      data-testid="correct-answer"
                      onClick={ () => {
                        this.setState({ clicked: optionIndex + 1 });
                        this.calcScore(option);
                      } }
                      className={ clicked ? 'correct-answer' : '' }
                      disabled={ clicked || time === 0 }
                    >
                      {option}
                    </button>
                  );
                }
                return (
                  <button
                    key={ optionIndex }
                    data-testid={ `wrong-answer-${optionIndex}` }
                    onClick={ () => this.setState({ clicked: true }) }
                    className={ clicked ? 'wrong-answer' : '' }
                    disabled={ clicked || time === 0 }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p>
              Placar:
              {' '}
              {score}
            </p>
          </div>
          {this.renderButtonClick()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    state: state.player,
  };
};

Game.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
