import React from 'react';
import ClueView from './index';
import Category from '../../interfaces/category';
import Clue from '../../interfaces/clue';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
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


describe('<ClueView/>', () => {
  it('Only has one button', () => {
    const clue = getNewClue();
    configure({adapter: new Adapter()});

    const wrapper = mount(<BrowserRouter><ClueView clue={clue} category={category}/></BrowserRouter>);
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
  });

  it('Toggle button text defaults to show answer', () => {
    const clue = getNewClue();

    configure({adapter: new Adapter()});
    const wrapper = mount(<BrowserRouter><ClueView clue={clue} category={category}/></BrowserRouter>);
    const button = wrapper.find('button');

    expect(button.text()).toEqual('Show Answer');
  });

  it('Toggle button toggles to show clue', () => {
    const clue = getNewClue();
    configure({adapter: new Adapter()});

    const wrapper = mount(<BrowserRouter><ClueView clue={clue} category={category}/></BrowserRouter>);
    debugger;

    wrapper.childAt(0).childAt(0).setState({
      showAnswer: true,
    });

    const button = wrapper.find('button');
    expect(button.text()).toEqual('Show Clue');
  });
});
