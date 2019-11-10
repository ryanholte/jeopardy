import React from 'react';
import './App.css';
import Board from './components/board';
import ClueView from './components/clue-view';
import Clue from './interfaces/clue';
import Category from './interfaces/category';
import GameControls from './components/game-controls';
import CategoriesData from './data/categories';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const api = 'http://jservice.io/api';

const fetchUrl = async (url: string) => {
  const get = await fetch(`${api}${url}`);
  const data = await get.json();
  return data
};

interface AppConfig {
  categories: Category[];
  clues: Clue[];
  columnsSelected: number;
  cluesSelected: number;
  gameOver: boolean;
  isLoading: boolean;
  resizing: boolean;
}

class App extends React.Component<{}, AppConfig> {

  constructor(props: any) {
    super(props);
    this.state = {
      categories: [],
      clues: [],
      columnsSelected: 5,
      cluesSelected: 5,
      gameOver: false,
      isLoading: false,
      resizing: false,
    };
  }


  componentDidMount() {
    this.setCategories();
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

  async resetGame() {
    await this.setState({
      cluesSelected: 5,
      columnsSelected: 5,
    });
    await this.setCategories();
  }

  reset() {
    const response = (window as any).confirm('Reset the game.');

    if (!response) {
      return;
    }

    this.resetGame();
  }

  newGame() {
    CategoriesData.map((category: Category) => category.wasUsed = false);
    this.setState({
      gameOver: false,
    });
    this.setCategories();
  }

  setClues(clues: number) {
    const parsedClues = Number(clues);
    this.setState({
      cluesSelected: parsedClues,
      resizing: true,
    });
    this.setCategories();
  }

  async setColumns(columns: number) {
    const parsedcolumn = Number(columns);
    console.log(parsedcolumn)
    await this.setState({
      columnsSelected: parsedcolumn,
      resizing: true,
    })
    await this.setCategories();
  }

  get availableCategories(): Category[] {
    return CategoriesData.filter((category: Category) => {
      if (!category.wasUsed) {
        return category;
      }
    });
  }

  async setCategories() {
    const categories: Category[] = this.availableCategories.slice(0, this.state.columnsSelected);
    const dailyDoubleCategoryIndex: number = Math.round(Math.random() * categories.length - 1);
    const dailyDoubleClueIndex: number = Math.round(Math.random() * 4);

    this.setState({
      isLoading: true,
    });

    if (!categories.length) {
      this.setState({
        gameOver: true,
      });
    }

    const boardCategories = await Promise.all(categories.map(async (category: Category, index: number) => {
      const clues = await this.loadClues(category.id);
      if (!this.state.resizing) {
        category.wasUsed = true;
      }

      if (index === dailyDoubleCategoryIndex) {
        clues[dailyDoubleClueIndex].isDailyDouble = true;
        console.log(`Hint: Daily double at: ${dailyDoubleCategoryIndex}, ${dailyDoubleClueIndex}`);
      }

      category.clues = clues.slice(0, this.state.cluesSelected);
      return category;
    }));

    this.setState({
      resizing: false,
      isLoading: false,
      categories: boardCategories,
    })
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
                {this.state.gameOver ? <div><h1>No More Categories</h1>
                  <button onClick={() => this.newGame()}>New Game</button>
                </div> : ''}
                {!this.state.gameOver ? <Board categories={this.state.categories} isLoading={this.state.isLoading}/> : ''}
                {!this.state.gameOver ?
                  <GameControls
                    reset={this.reset.bind(this)}
                    setColumns={this.setColumns.bind(this)}
                    setClues={this.setClues.bind(this)}
                    columnsSelected={this.state.columnsSelected}
                    cluesSelected={this.state.cluesSelected}
                  /> : ''}
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
