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
      let addState = [...state, todo];
      Taro.setStorageSync('todosState', addState);
      return addState;
    case DELETE_TODO:
      let deleteState = [...state].filter(todo => todo.id != action.id);
      Taro.setStorageSync('todosState', deleteState);
      return deleteState;
    case DELETE_TODOS:
      let deletesState = [...state].filter(todo => todo.catId != action.id);
      Taro.setStorageSync('todosState', deletesState);
      return deletesState;
    case MODIFY_TODO_NAME:
      let modifyNameState = [...state];
      modifyNameState.forEach(todo => {
        if (todo.id === action.id) {
          todo.name = action.name;
        }
      });
      Taro.setStorageSync('todosState', modifyNameState);
      return modifyNameState;
    case CHANGE_TODO_STATUS:
      let changeNameState = [...state];
      changeNameState.forEach(todo => {
        if (todo.id === action.id) {
          todo.status = !todo.status;
        }
      });
      Taro.setStorageSync('todosState', changeNameState);
      return changeNameState;
    default:
      return state;
  }
}
