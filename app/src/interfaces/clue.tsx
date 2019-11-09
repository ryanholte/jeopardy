import Category from './category';

export default interface Clue {
  id: number;
  question: string;
  answer: string;
  value: number;
  isDailyDouble: boolean;
  hasBeenViewed: boolean;

  category?: Category;
}
