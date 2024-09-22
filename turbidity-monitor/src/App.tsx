import React from 'react';
import './App.css';
import TurbidityStatus from './components/TurbidityStatus';

const App: React.FC = () => {
  return (
    <div className="App">
      <TurbidityStatus />
    </div>
  );
};

export default App;
