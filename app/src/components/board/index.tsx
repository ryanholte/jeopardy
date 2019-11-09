import React from 'react';
import BoardCategory from '../category';
import Category from '../../interfaces/category';
import Categories from '../../interfaces/categories';


class Board extends React.Component<Categories> {

  render() {
    return (
      <div>
        <h1>Today on Jeopardy ... </h1>

        <div className={'row d-flex flex-row'}>
          {this.props.categories.map((category: Category) => <BoardCategory key={category.id} questions={category.questions} category={category}/>)}
        </div>
      </div>
    )
  }
}


export default Board;
