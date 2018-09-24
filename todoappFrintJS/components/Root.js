import React, { Component } from 'react';
import { observe } from 'frint-react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { merge } from 'rxjs/operator/merge';
import { scan } from 'rxjs/operator/scan';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { addItem } from '../actions/todos';
import Item from './Item';

class Root extends Component {

  render() {
    return (
      <div>
        <form>
        <TextField
          label="Title"
          margin="normal"
          variant="outlined"
          value={this.props.inputValue}
          onChange={(e) => this.props.changeTitle(e.target.value)}
        />
        <br />
        <TextField
          label="Description"
          value={this.props.inputValueDescription}
          margin="normal"
          variant="outlined"
          style={{width: '500px'}}
          onChange={(e) => this.props.changeDescription(e.target.value)}
        />
        
        <Button
          type="submit"
          style={{marginLeft: '10px'}}
          variant="contained"
          color="primary"
          type="button"
          onClick={() => {if(this.props.inputValue && this.props.inputValueDescription)this.props.addItem(this.props.inputValue, this.props.inputValueDescription)}}
        >
          Submit
        </Button>
        </form>
        <br /><br />
        
        <div style={{background: '#f1f1f1', border: '1px solid #e1e1e1', marginBottom: '15px', padding: '15px', borderRadius: '4px'}}>
          {this.props.todos.map((todo, index) => (
            <Item
              key={`todo-${index}`}
              todo={todo}
            />
           ))}
        </div>
      </div>
    );
  }
}

export default observe(function (app) { // eslint-disable-line func-names
  const store = app.get('store');

  const state$ = store.getState$()
      ::map((state) => {
        return {
          todos: state.todos.records,
        };
      });

  const titleInput$ = new BehaviorSubject('')
    ::map((inputValue) => {
      return {
        inputValue,
      };
    });
    
    const descriptionInput$ = new BehaviorSubject('')
    ::map((inputValueDescription) => {
      return {
        inputValueDescription,
      };
    });
  const clearInput = () => {
    titleInput$.next('');
    descriptionInput$.next('');
  }
  const changeTitle = value => titleInput$.next(value);
  const changeDescription = value => descriptionInput$.next(value);

  const actions$ = Observable.of({
    addItem: (...args) => {
      clearInput();
      return store.dispatch(addItem(...args));
    },
    changeTitle,
    changeDescription,
    clearInput,
  });

  return state$
    ::merge(actions$, titleInput$, descriptionInput$)
    ::scan((props, emitted) => {
      return {
        ...props,
        ...emitted,
      };
    }, {
      todos: [],
    });
})(Root);
