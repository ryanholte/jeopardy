import React from 'react';
import ReactDOM from 'react-dom';
import ClueComponent from './index';
import Category from '../../interfaces/category';
import Clue from '../../interfaces/clue';
import {BrowserRouter} from 'react-router-dom';
import {shallow} from 'enzyme';

const clue: Clue = {
  id: 123,
  question: 'what gets wetter as it dries',
  answer: 'towel',
  value: 400,
  hasBeenViewed: false,
  isDailyDouble: false,
};

const category: Category = {
  id: 123,
  title: 'stumpers',
};


it('adds viewed class when viewed', () => {
  // const div = document.createElement('div');
  // ReactDOM.render(<BrowserRouter><ClueComponent clue={clue} category={category}/></BrowserRouter>, div);
  // ReactDOM.findDOMNode()
  // ReactDOM.unmountComponentAtNode(div);

  const wrapper = shallow(<BrowserRouter><ClueComponent clue={clue} category={category}/></BrowserRouter>);
  const found = wrapper.find('.clue-wrapper');
  console.log(found);
  expect(wrapper.find('.clue-wrapper')).toBeTruthy();
});
