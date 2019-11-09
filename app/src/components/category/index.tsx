import React from 'react';
import QuestionComponent from '../question';
import Question from '../../interfaces/question';
import Category from '../../interfaces/category';
import './category.css';

interface BoardCategoryProps {
  category: Category,
  questions: Question[],
}

class BoardCategory extends React.Component<BoardCategoryProps> {
  state = {
    questions: [],
  };

  render() {
    return (
      <div className={'cat text-center'}>
        <div className={'col-12 p-0 m-0 title'}>
          <span>{this.props.category.title}</span>
        </div>
        {this.props.questions.map((question: Question) => {
          return (
            <div key={question.id} className={'col-12 p-0 m-0'}>
              <QuestionComponent key={question.id} question={question} category={this.props.category}/>
            </div>
          );
        })}
      </div>
    )
  }
}

export default BoardCategory;
