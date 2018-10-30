import { gluer } from 'glue-redux';

const book = gluer((data, state) => [data, ...state], []);

export default {
  book,
};
