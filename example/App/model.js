import { gluer } from 'glue-redux';

const users = gluer((data, state) => [data, ...state], []);

const app = {
  users,
};
export default app;
