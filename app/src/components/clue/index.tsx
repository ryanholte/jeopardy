import React from 'react';
import './clue.css';
import {
  Link
} from 'react-router-dom';
import Clue from '../../interfaces/clue';
import Category from '../../interfaces/category';

interface BoardClue {
  clue: Clue,
  category: Category,
}

class ClueComponent extends React.Component<BoardClue> {
  render() {
    return (
      <div className={`clue-wrapper ${this.props.clue.hasBeenViewed ? 'viewed' : ''} d-flex align-content-center justify-content-center flex-column`}>
        <Link
          onClick={() => this.props.clue.hasBeenViewed = true}
          to={{
            pathname: '/clue',
            state: {clue: this.props.clue}
          }}>
          {this.props.clue.value}
        </Link>
      </div>
    )
  }
}


export default ClueComponent;
