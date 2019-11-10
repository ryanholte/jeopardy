import React from 'react';
import ClueComponent from './index';
import Category from '../../interfaces/category';
import Clue from '../../interfaces/clue';
import {BrowserRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import {mount, configure} from 'enzyme';

const getNewClue = (): Clue => ({
  id: 123,
  question: 'what gets wetter as it dries',
  answer: 'towel',
  value: 400,
  hasBeenViewed: false,
  isDailyDouble: false,
});

const category: Category = {
  id: 123,
  title: 'stumpers',
};


describe('<Clue/>', () => {
  it('Does not have viewed class', () => {
    const clue = getNewClue();

    configure({adapter: new Adapter()});
    const wrapper = mount(<BrowserRouter><ClueComponent clue={clue} category={category}/></BrowserRouter>);
    const found = wrapper.find('.viewed');
    expect(found).toHaveLength(0);
  });

  it('Does have viewed class', () => {
    const clue = getNewClue();
    clue.hasBeenViewed = true;
    configure({adapter: new Adapter()});

    const wrapper = mount(<BrowserRouter><ClueComponent clue={clue} category={category}/></BrowserRouter>);
    const found = wrapper.find('.viewed');
    expect(found).toHaveLength(1);
  });
});
