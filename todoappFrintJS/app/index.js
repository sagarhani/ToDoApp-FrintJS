import _ from 'lodash';
import { createApp } from 'frint';
import { createStore } from 'frint-store';
import { RegionService } from 'frint-react';

import RootComponent from '../components/Root';
import rootReducer from '../reducers';

export default createApp({
  name: 'TodoAppFrint',
  providers: [
    {
      name: 'component',
      useValue: RootComponent,
    },
    {
      name: 'store',
      useFactory({ app }) {
        const Store = createStore({
          initialState: {
            todos: {
              records: [
                {
                  id: _.uniqueId(),
                  title: 'Learn React-Native',
                  description: "Framework to build mobile apps using only JavaScript."
                },
                {
                  id: _.uniqueId(),
                  title: 'Learn Vue.js',
                  description: "JavaScript framework to build user interfaces."
                },
              ]
            },
          },
          reducer: rootReducer,
          deps: { app },
        });

        return new Store();
      },
      deps: ['app'],
    },
    {
      name: 'region',
      useClass: RegionService,
    }
  ],
});
