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
export default function category(
  state = Taro.getStorageSync('categoryState') || initState,
  action
) {
  switch (action.type) {
    case ADD_CATEGORY:
      const category = {
        id: id++,
        name: action.name
      };
      let addState = [...state, category];
      Taro.setStorageSync('categoryState', addState);
      return addState;
    case DELETE_CATEGORY:
      let deleteState = [...state].filter(cat => cat.id != action.id);
      Taro.setStorageSync('categoryState', deleteState);
      return deleteState;
    case MODIFY_CATEGORY:
      let modifyState = [...state];
      modifyState.forEach(cat => {
        if (cat.id == action.id) {
          cat.name = action.name;
        }
      });
      Taro.setStorageSync('categoryState', modifyState);
      return modifyState;
    default:
      return state;
  }
}
