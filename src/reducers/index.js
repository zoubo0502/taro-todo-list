import { combineReducers } from 'redux'
import counter from './counter'
import category from './category'
import todos from './todos'

export default combineReducers({
  counter,
  category,
  todos
})
