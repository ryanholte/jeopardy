import React from 'react';
import BoardCategory from '../category';
import Category from '../../interfaces/category';
import Categories from '../../interfaces/categories';


class Board extends React.Component<Categories> {

  render() {
    return (
      <div>
        <h1>Today on Jeopardy ... </h1>

        <div className={'row d-flex justify-content-center flex-row'}>
          {this.props.categories.map((category: Category) => <BoardCategory key={category.id} clues={category.clues} category={category}/>)}
        </div>
      </div>
    )
  }
}


export default Board;
