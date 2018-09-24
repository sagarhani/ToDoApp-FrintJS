import TodoAppFrint from './app';

// Registering child app to Root app
// TodoAppFrint is child app
// Loading child app - TodoAppFrint in region named main
window.app.registerApp(TodoAppFrint, {
  regions: ['main'],
  weight: 100,
});
