import React from 'react';
import BoardCategory from '../category';
import Category from '../../interfaces/category';

interface CategoriesInterface {
  categories: Category[];
  isLoading: boolean;
}

const loadingState = () => {
  const index = Math.round(Math.random() * 2);

  const sources = [
    'https://media.giphy.com/media/5WjvKxNfgcprHtuJ9v/100.gif',
    'https://media.giphy.com/media/5es1o4Jl4yCXdbNvgL/100.gif',
    'https://media.giphy.com/media/2YnvV8tPg7usSzGehj/100.gif',
  ];

  return sources[index];
};

class Board extends React.Component<CategoriesInterface> {
  boardRender() {
    if (this.props.isLoading) {
      return (
        <div className={'col-12 d-flex justify-content-center'}>
          <img src={loadingState()}/>
        </div>
      );
    }

    return (<div>

      <div className={'row d-flex justify-content-center flex-row'}>
        {this.props.categories.map((category: Category) => <BoardCategory key={category.id} clues={category.clues || []} category={category}/>)}
      </div>
    </div>)
  }

  render() {
    return (
      <div>
        <h1>Today on Jeopardy ... </h1>

        {this.boardRender()}
      </div>
    )
  }
}


export default Board;
