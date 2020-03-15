import React from 'react';
import './App.scss';

// Component imports
import Header from './components/Header';
import MasterRouter from './components/MasterRouter';

// The main app component that renders all child content
// and manages all routing through the MasterRouter
function App() {
  return (
    <div className="App">
      <Header />
      <MasterRouter />
    </div>
  );
}

export default App;
