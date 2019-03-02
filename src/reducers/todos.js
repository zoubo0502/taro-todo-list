import {
  ADD_TODO,
  DELETE_TODO,
  MODIFY_TODO_NAME,
  CHANGE_TODO_STATUS,
  DELETE_TODOS
} from '../constants/todos';
import Taro from '@tarojs/taro';

// const initState = [
//   { id: 1, name: 'todo1', catId: 1, status: false },
//   { id: 2, name: 'todo2', catId: 1, status: true },
//   { id: 3, name: 'todo3', catId: 2, status: false },
//   { id: 4, name: 'todo4', catId: 2, status: true },
//   { id: 5, name: 'todo5', catId: 2, status: false },
//   { id: 6, name: 'todo6', catId: 3, status: false },
//   { id: 7, name: 'todo7', catId: 3, status: true },
//   { id: 8, name: 'todo8', catId: 3, status: true },
//   { id: 9, name: 'todo9', catId: 3, status: true }
// ];
const initState = [
  { id: 200, name: '点我更改完成状态', catId: 200, status: true },
  { id: 201, name: '左滑可以编辑删除', catId: 200, status: false },
  { id: 202, name: '试试点击‘添加Todo’', catId: 200, status: false }
];
let id = 1;
export default function todos(state = Taro.getStorageSync('todosState') || initState, action) {
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
