import Category from './category';

export default interface Question {
  id: number;
  question: string;
  answer: string;
  value: number;
  isDailyDouble: boolean;
  hasBeenViewed: boolean;

  category?: Category;
}
