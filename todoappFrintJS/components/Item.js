import React, { Component } from 'react';
import { observe, streamProps, Region } from 'frint-react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { deleteItem, updateItem } from '../actions/todos';

class Item extends Component {
  render() {
    const { todo } = this.props;

    return (
      <div>
        {!this.props.showEditForm && (
          <Paper 
            elevation={1}
            style={{marginBottom: '10px', paddingBottom: '10px'}}
          >
            <Typography 
              variant="headline" 
              component="h3"
              style={{padding: '10px 0px 0px 15px'}}
            >
              {todo.title} 
              <Tooltip title="Edit" 
                placement="top"
              >
                <IconButton 
                  aria-label="Edit" 
                  style={{marginLeft:'5px'}}
                  onClick={() => this.props.edit(todo)}  
                >
                  <EditIcon 
                    fontSize="small" 
                    color="primary"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" placement="top">
                <IconButton 
                aria-label="Delete"
                  href="javascript:" onClick={() => this.props.deleteItem(todo.id)}
                >
                  <DeleteIcon fontSize="small" color="error"/>
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography 
              component="p"
              style={{padding: '3px 0px 0px 15px'}}
            >
              {todo.description}
            </Typography>
          </Paper>
        )}
        {this.props.showEditForm && (
          <Paper elevation={1} style={{marginBottom: '10px', paddingBottom: '5px'}}>
            <div style={{marginLeft: '10px'}}>
                  <TextField
                    label="Title"
                    margin="normal"
                    variant="outlined"
                    value={this.props.inputValue}
                    onChange={(e) => this.props.changeInput(e.target.value)}
                  />
                  <TextField
                    label="Description"
                    margin="normal"
                    variant="outlined"
                    style={{width: '500px', marginLeft: '10px'}}
                    value={this.props.inputValueDescription}
                    onChange={(e) => this.props.changeInputDescription(e.target.value)}
                  />
                  <Button
                    style={{marginLeft: '10px'}}
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={() => {if(this.props.inputValue && this.props.inputValueDescription)this.props.submit(todo.id, this.props.inputValue, this.props.inputValueDescription)}}
                  >
                    Update 
                  </Button>

                  <Button
                    style={{marginLeft: '10px'}}
                    variant="contained"
                    color="secondary"
                    type="button"
                    href="javascript:" onClick={() => this.props.cancelEdit()}
                  >
                    Cancel 
                  </Button>
            </div>          
          </Paper>
        )}
      </div>
    );
  }
}

export default observe(function (app) {
  const showEditForm$ = new BehaviorSubject(false); // start with hidden form
  const titleInput$ = new BehaviorSubject('');
  const descriptionInput$ = new BehaviorSubject('');
  const store = app.get('store');

  const cancelEdit = () => {
    titleInput$.next(''); // clear input field value
    showEditForm$.next(false);
  };

  return streamProps()
    // dispatchable actions against store
    .setDispatch(
      { deleteItem },
      store
    )

    // stream values
    .set(
      showEditForm$,
      (showEditForm) => ({ showEditForm })
    )
    .set(
      titleInput$,
      (inputValue) => ({ inputValue })
    )
    .set(
      descriptionInput$,
      (inputValueDescription) => ({ inputValueDescription })
    )

    // form actions
    .set({
      edit: (todo) => {
        titleInput$.next(todo.title);
        descriptionInput$.next(todo.description); // set input field value
        showEditForm$.next(true);
      },
      changeInput: (value) => {
        titleInput$.next(value);
      },
      changeInputDescription: (value) => {
        descriptionInput$.next(value);
      },
      cancelEdit,
      submit: (id, newTitle, newDescription) => {
        store.dispatch(updateItem(id, newTitle, newDescription));
        cancelEdit();
      }
    })

    // final observable
    .get$();
    
})(Item);

