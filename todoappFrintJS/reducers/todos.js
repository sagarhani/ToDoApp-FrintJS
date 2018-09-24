import _ from 'lodash';

import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from '../constants';

const INITIAL_STATE = {
  records: [],
};

export default function todos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_ITEM:
      return Object.assign({}, {
        records: [
          ...state.records,
          {
            id: _.uniqueId(),
            title: action.title,
            description: action.description
          }
        ]
      });

    case DELETE_ITEM:
      return Object.assign({}, {
        records: state.records.filter(todo => todo.id != action.id),
      });

    case UPDATE_ITEM:
      return Object.assign({}, {
        records: state.records
          .map((todo) => {
            if (todo.id !== action.id) {
              return todo;
            }

            todo.title = action.title;
            todo.description = action.description;

            return todo;
          })
      });

    default:
      return state;
  }
}
