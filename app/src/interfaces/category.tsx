import Question from './question';

export default interface Category {
  id: number;
  title: string;

  questions: Question[];
}
