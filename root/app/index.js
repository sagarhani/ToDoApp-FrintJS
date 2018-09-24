import { createApp } from 'frint';

import RootComponent from '../components/Root';

export default createApp({
  name: 'todoAppFrintJS',
  providers: [
    {
      name: 'component',
      useValue: RootComponent
    }
  ],
});
