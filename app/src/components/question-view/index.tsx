import React from 'react';
import Question from '../../interfaces/question';
import './clue.css';

import {Link} from 'react-router-dom';

class QuestionView extends React.Component<Question> {
  state = {
    showAnswer: false,
  };

  componentDidMount() {
  }

  showMainText() {
    if (this.state.showAnswer) {
      return (
        this.props.answer
      )
    }
    return (
      this.props.question
    )
  }

  getButton() {
    return (
      <button
        className={'btn btn-primary'}
        onClick={() => (this.setState({showAnswer: !this.state.showAnswer}))}>
        {this.state.showAnswer ? 'Show Question' : 'Show Answer'}
      </button>
    )
  }

  getDailyDouble() {
    if (!this.props.isDailyDouble) {
      return;
    }

    return (
      <h3>Your daily double!</h3>
    )
  }

  render() {
    return (
      <div className={'row d-flex align-content-center justify-content-center mt-5'}>
        <div className={'col-12 text-center'}>
          <div className={'jumbotron col-12'}>
            {this.getDailyDouble()}
            {this.showMainText()}
          </div>
        </div>
        <div className={'col-12 text-center'}>
          <div className={'col-12'}>
            {this.getButton()}
          </div>
          <div className={'col-12'}>
            <Link to={'/'} className={'btn btn-outline'}>Close</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionView;
