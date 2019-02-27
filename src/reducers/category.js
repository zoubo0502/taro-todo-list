import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  MODIFY_CATEGORY
} from '../constants/category';

// const initState = [
//   { id: 1, name: 'test1' },
//   { id: 2, name: 'test2' },
//   { id: 3, name: 'test3' }
// ];

const initState = [];
let id = 1;

export default function category(state = initState, action) {
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
