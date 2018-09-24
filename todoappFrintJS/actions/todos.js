import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../constants';

// Adding action type ADD_ITEM

export function addItem(title, description) {
  return {
    type: ADD_ITEM,
    title,
    description
  };
}

// Adding action type DELETE_ITEM

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id,
  };
}

// Adding action type UPDATE_ITEM

export function updateItem(id, title, description) {
  return {
    type: UPDATE_ITEM,
    id,
    title,
    description
  };
}
