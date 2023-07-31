import React from 'react';
import Channel from './components/Channel';
import initialEvents from './api/initialEvents';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>EnsoData Scoring Viewer</h1>
      <Channel initialEvents={initialEvents} />
    </div>
  );
};

export default App;
