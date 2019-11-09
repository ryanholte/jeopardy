import Clue from './clue';

export default interface Category {
  id: number;
  title: string;

  clues: Clue[];
}
