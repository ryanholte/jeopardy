import React from 'react';
import ClueComponent from '../clue';
import Clue from '../../interfaces/clue';
import Category from '../../interfaces/category';
import './category.css';

interface BoardCategoryProps {
  category: Category,
  clues: Clue[],
}

class BoardCategory extends React.Component<BoardCategoryProps> {
  state = {
    clues: [],
    category: {},
  };

  render() {
    return (
      <div className={'cat text-center'}>
        <div className={'col-12 p-0 m-0 title'}>
          <span>{this.props.category.title}</span>
        </div>
        {this.props.clues.map((clue: Clue) => {
          return (
            <div key={clue.id} className={'col-12 p-0 m-0'}>
              <ClueComponent key={clue.id} clue={clue} category={this.props.category}/>
            </div>
          );
        })}
      </div>
    )
  }
}

export default BoardCategory;
