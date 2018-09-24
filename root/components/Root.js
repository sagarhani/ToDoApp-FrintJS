import React, { Component } from 'react';
import { Region } from 'frint-react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Root extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography 
            variant="display1" 
            gutterBottom
          >
            ToDo App - FrintJS
          </Typography>
          
          <hr /> 

          <Region
            name="main"
          />

        </Grid>
      </Grid>
    );
  }
}

export default Root;
