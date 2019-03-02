import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  MODIFY_CATEGORY
} from '../constants/category';
import Taro from '@tarojs/taro';
// const initState = [
//   { id: 1, name: 'test1' },
//   { id: 2, name: 'test2' },
//   { id: 3, name: 'test3' }
// ];

let initState = [
  { id: 200, name: '1.试着点击我' },
  { id: 201, name: '2.试着左滑' }
];
let id = 1;
export default function category(state = Taro.getStorageSync('categoryState') || initState, action) {
  console.log(state)
  console.log('cat reducer')
  switch (action.type) {
    case ADD_CATEGORY:
      const category = {
        id: id++,
        name: action.name
      };
      return [...state, category];
    case DELETE_CATEGORY:
      return [...state].filter(cat => cat.id != action.id);
    case MODIFY_CATEGORY:
      let newState = [...state];
      newState.forEach(cat => {
        if (cat.id === action.id) {
          cat.name = action.name;
        }
      });
      return newState;
    default:
      return state;
  }
}
