import {
  ADD_TODO,
  DELETE_TODO,
  MODIFY_TODO_NAME,
  CHANGE_TODO_STATUS,
  DELETE_TODOS
} from '../constants/todos';

const initState = [
  { id: 1, name: 'todo1', catId: 1, status: false },
  { id: 2, name: 'todo2', catId: 1, status: true },
  { id: 3, name: 'todo3', catId: 2, status: false },
  { id: 4, name: 'todo4', catId: 2, status: true },
  { id: 5, name: 'todo5', catId: 2, status: false },
  { id: 6, name: 'todo6', catId: 3, status: false },
  { id: 7, name: 'todo7', catId: 3, status: true },
  { id: 8, name: 'todo8', catId: 3, status: true },
  { id: 9, name: 'todo9', catId: 3, status: true }
];
let id = 1;

export default function todos(state = initState, action) {
  switch (action.type) {
    case ADD_TODO:
      const todo = {
        id: id++,
        name: action.name,
        catId: action.catId,
        status: false
      };
      return [...state, todo];
    case DELETE_TODO:
      return [...state].filter(todo => todo.id != action.id);
    case DELETE_TODOS:
      return [...state].filter(todo => todo.catId != action.id);
    case MODIFY_TODO_NAME:
      let newTodos = [...state];
      newTodos.forEach(todo => {
        if (todo.id === action.id) {
          todo.name = action.name;
        }
      });
      return newTodos;
    case CHANGE_TODO_STATUS:
      let newTodoss = [...state];
      newTodoss.forEach(todo => {
        if (todo.id === action.id) {
          todo.status = !todo.status;
        }
      });
      return newTodoss;
    default:
      return state;
  }
}
