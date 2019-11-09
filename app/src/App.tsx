import React from 'react';
import './App.css';
import Board from './components/board';
import QuestionView from './components/rule-view';
import Question from './interfaces/question';
import Category from './interfaces/category';
import Categories from './interfaces/categories';

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
  questions: [],
}, {
  id: 309,
  title: 'The Movies',
  questions: [],
}, {
  id: 705,
  title: 'Familiar Phrases',
  questions: [],
}, {
  id: 267,
  title: 'Nature',
  questions: [],
}, {
  id: 369,
  title: 'Travel & Tourism',
  questions: [],
}];

const api = 'http://jservice.io/api';

const fetchUrl = async (url: string) => {
  const get = await fetch(`${api}${url}`);
  const data = await get.json();
  return data
};


class App extends React.Component<{}, Categories> {
  constructor(props: any) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  setQuestionViewed(categoryId: number, questionId: number) {
    const category = this.state.categories.find((category: Category) => category.id === categoryId);

    if (!category) {
      return;
    }

    const otherCategories = this.state.categories.filter((category: Category) => category.id !== categoryId);
    const question = category.questions.find((question: Question) => question.id === questionId);
    const otherQuestions = category.questions.filter((question: Question) => question.id !== questionId);

    if (!question || question.hasBeenViewed) {
      return;
    }

    question.hasBeenViewed = true;

    otherQuestions.push(question);
    category.questions = this.questionsSorted(otherQuestions);
    otherCategories.push(category);
    this.setState({
      categories: this.categoriesSorted(otherCategories),
    });
  }

  async componentDidMount() {
    await this.loadCategories();
  }

  categoriesSorted(categories: Category[]): Category[] {
    return categories.sort((category1: Category, category2: Category) => category1.title.localeCompare(category2.title));
  }

  questionsSorted(questions: Question[]): Question[] {
    return questions.sort((question1: Question, question2: Question) => {
      if (question1.value > question2.value) {
        return 1;
      }
      return -1;
    })
  }

  async loadCategories() {
    const dailyDoubleCategoryIndex: number = Math.round(Math.random() * categories.length - 1);
    const dailyDoubleQuestionIndex: number = Math.round(Math.random() * 4);
    console.log(`Hint: Daily Double can be found at index ${dailyDoubleCategoryIndex}, ${dailyDoubleQuestionIndex}`);
    return Promise.all(this.categoriesSorted(categories).map(async (category: Category, index: number) => {
      let questions = await this.loadQuestions(category.id);
      if (index === dailyDoubleCategoryIndex) {
        questions[dailyDoubleQuestionIndex].isDailyDouble = true;
      }

      category.questions = this.questionsSorted(questions);
      const categories = this.state.categories;
      categories.push(category);
      this.setState({
        categories: this.categoriesSorted(categories),
      });
    }));
  }

  async loadQuestions(categoryId: number): Promise<Question[]> {
    let data = await fetchUrl(`/clues?category=${categoryId}`);
    data = data.filter((question: Question) => [100, 200, 300, 400, 500].includes(question.value));
    return data.slice(0, 5);
  }

  render() {

    return (
      <div className={'container d-flex justify-content-center'}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Board categories={this.state.categories}/>
            </Route>
            <Route path="/question"
                   render={(state: any) => <QuestionView id={state.location.state.question.id} question={state.location.state.question.question} answer={state.location.state.question.answer}
                                                         value={state.location.state.question.value} hasBeenViewed={state.location.state.question.hasBeenViewed}
                                                         isDailyDouble={state.location.state.question.isDailyDouble}/>}>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
