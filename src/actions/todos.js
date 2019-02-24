import { ADD_TODO, DELETE_TODO, MODIFY_TODO_NAME, CHANGE_TODO_STATUS, DELETE_TODOS } from "../constants/todos";

export const addTodo = (name, catId) => {
  return {
    type: ADD_TODO,
    name,
    catId
  }
}

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

export const modifyTodo = (id, name) => {
  return {
    type: MODIFY_TODO_NAME,
    id,
    name
  }
}

export const changeTodoStatus = (id) => {
  return {
    type: CHANGE_TODO_STATUS,
    id
  }
}

export const deleteTodos = (id) => {
  return {
    type: DELETE_TODOS,
    id
  }
}