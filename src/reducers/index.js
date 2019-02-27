import { combineReducers } from 'redux'
import category from './category'
import todos from './todos'

export default combineReducers({
  category,
  todos
})
