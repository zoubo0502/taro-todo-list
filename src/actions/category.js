import { ADD_CATEGORY, DELETE_CATEGORY, MODIFY_CATEGORY } from "../constants/category";

export const addCategory = (name) => {
  return {
    type: ADD_CATEGORY,
    name
  }
}

export const deleteCategory = (id) => {
  return {
    type: DELETE_CATEGORY,
    id
  }
}

export const modifyCategory = (id,name) => {
  return {
    type: MODIFY_CATEGORY,
    id,
    name
  }
}