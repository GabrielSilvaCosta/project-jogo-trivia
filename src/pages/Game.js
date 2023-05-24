import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  state = {
    questions: [],
    clicked: false,
    questionIndex: 0,
  };

  componentDidMount() {
    this.requestQuestions();
  }

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

      return this.setState({ questions, clicked: false });
    } catch (error) {
      console.error('Faça login novamente!', error);
      localStorage.clear();
      return history.push('/');
    }
  };

  // botao para a proxima pergunta

  renderButtonClick = () => {
    const { clicked } = this.state;
    if (clicked) {
      return (
        <button data-testid="btn-next" onClick={ this.nextButtonClick }>Next</button>
      );
    }
  };

  nextButtonClick = () => {
    const { questionIndex, questions } = this.state;
    if (questionIndex + 1 < questions.length) {
      this.setState((prevState) => ({
        questionIndex: prevState.questionIndex + 1,
        clicked: false,
      }));
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
    const { questions, clicked, questionIndex } = this.state;

    if (questions.length === 0) {
      return <div data-testid="loading">Loading...</div>;
    }

    const {
      category, question, options, correct_answer: correct,
    } = questions[questionIndex];

    return (
      <div>
        <Header />
        <div>
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
                      onClick={ () => this.setState({ clicked: true }) }
                      style={ clicked ? { border: '3px solid rgb(6, 240, 15)' } : null }
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
                    style={ clicked ? { border: '3px solid red' } : null }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {this.renderButtonClick()}

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state.player,
});

Game.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
