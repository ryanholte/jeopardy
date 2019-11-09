import React from 'react';
import './App.css';
import Board from './components/board';
import ClueView from './components/clue-view';
import Clue from './interfaces/clue';
import Category from './interfaces/category';
import Categories from './interfaces/categories';
import GameControls from './components/game-controls';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import category from './interfaces/category';
import * as Q from 'q';


const categories: Category[] = [{
  id: 218,
  title: 'Science',
  clues: [],
}, {
  id: 309,
  title: 'The Movies',
  clues: [],
}, {
  id: 705,
  title: 'Familiar Phrases',
  clues: [],
}, {
  id: 267,
  title: 'Nature',
  clues: [],
}, {
  id: 369,
  title: 'Travel & Tourism',
  clues: [],
}];

const api = 'http://jservice.io/api';

const fetchUrl = async (url: string) => {
  const get = await fetch(`${api}${url}`);
  const data = await get.json();
  return data
};

interface AppConfig {
  categories: Category[],
  clues: Clue[],
  columnsSelected: number,
  cluesSelected: number,
}

class App extends React.Component<{}, AppConfig> {

  constructor(props: any) {
    super(props);
    this.state = {
      categories: [],
      clues: [],
      columnsSelected: 5,
      cluesSelected: 5,
    };
  }


  async componentDidMount() {
    await this.loadCategories();
  }

  categoriesSorted(categories: Category[]): Category[] {
    return categories.sort((category1: Category, category2: Category) => category1.title.localeCompare(category2.title));
  }

  cluesSorted(questions: Clue[]): Clue[] {
    return questions.sort((question1: Clue, question2: Clue) => {
      if (question1.value > question2.value) {
        return 1;
      }
      return -1;
    })
  }

  resetGame() {
    this.setState({
      cluesSelected: 5,
      columnsSelected: 5,
      clues: this.state.clues.map((clue: Clue) => {
        clue.hasBeenViewed = false;
        return clue;
      }),
    });
  }

  reset() {
    // const response = (window as any).confirm('Reset the game.');

    // if (!response) {
    //   return;
    // }

    this.resetGame();
  }

  setClues(clues: number) {
    const parsedClues = Number(clues);
    this.setState({
      cluesSelected: parsedClues,
    });
  }

  setColumns(columns: number) {
    const parsedcolumn = Number(columns);
    this.setState({
      columnsSelected: parsedcolumn,
    });
  }

  get boardCategories(): Category[] {
    const categories: Category[] = this.state.categories.slice(0, this.state.columnsSelected);
    return categories.map((category: Category) => {
      category.clues = this.getCluesForCategory(category.id).slice(0, this.state.cluesSelected);
      return category;
    });
  }

  getCluesForCategory(categoryId: number) {
    return this.state.clues.filter((clue: Clue) => clue.category && clue.category.id === categoryId);
  }

  async loadCategories() {
    const dailyDoubleCategoryIndex: number = Math.round(Math.random() * categories.length - 1);
    const dailyDoubleClueIndex: number = Math.round(Math.random() * 4);
    console.log(`Hint: Daily Double can be found at index ${dailyDoubleCategoryIndex}, ${dailyDoubleClueIndex}`);
    return Promise.all(this.categoriesSorted(categories).map(async (category: Category, index: number) => {
      let clues = await this.loadClues(category.id);
      if (index === dailyDoubleCategoryIndex) {
        clues[dailyDoubleClueIndex].isDailyDouble = true;
      }

      category.clues = this.cluesSorted(clues);
      const categories = this.state.categories;
      categories.push(category);
      this.setState({
        clues: this.state.clues.concat(clues),
        categories: this.categoriesSorted(categories)
      });
    }));
  }

  async loadClues(categoryId: number): Promise<Clue[]> {
    let data = await fetchUrl(`/clues?category=${categoryId}`);
    data = data.filter((question: Clue) => [100, 200, 300, 400, 500].includes(question.value));
    return data.slice(0, 5);
  }

  render() {

    return (
      <div className={'container d-flex justify-content-center'}>
        <Router>
          <Switch>
            <Route exact path="/">
              <div className={'d-flex flex-column'}>
                <Board categories={this.boardCategories}/>
                <GameControls
                  reset={this.reset.bind(this)}
                  setColumns={this.setColumns.bind(this)}
                  setClues={this.setClues.bind(this)}
                  columnsSelected={this.state.columnsSelected}
                  cluesSelected={this.state.cluesSelected}
                />
              </div>
            </Route>
            <Route path="/clue"
                   render={(state: any) => <ClueView
                     id={state.location.state.clue.id}
                     question={state.location.state.clue.question}
                     answer={state.location.state.clue.answer}
                     value={state.location.state.clue.value}
                     hasBeenViewed={state.location.state.clue.hasBeenViewed}
                     isDailyDouble={state.location.state.clue.isDailyDouble}/>
                   }>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
