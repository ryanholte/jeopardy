import React from 'react';
import './question.css';
import {
  Link
} from 'react-router-dom';
import Question from '../../interfaces/question';
import Category from '../../interfaces/category';

interface BoardQuestion {
  question: Question,
  category: Category,
}

class QuestionComponent extends React.Component<BoardQuestion> {
  render() {
    return (
      <div className={`question-wrapper ${this.props.question.hasBeenViewed ? 'viewed' : ''} d-flex align-content-center justify-content-center flex-column`}>
        <Link
          onClick={() => this.props.question.hasBeenViewed = true}
          to={{
            pathname: '/question',
            state: {question: this.props.question}
          }}>
          {this.props.question.value}
        </Link>
      </div>
    )
  }
}


export default QuestionComponent;
