import React, {useState} from 'react';
import './App.css';

import Grid from './components/Grid'

function App() {

  const [rowsCount, setRowsCount] = useState(30);
  const [colsCount, setColsCount] = useState(50);
  return (
    <div className="App">
      <Grid rowsCount={rowsCount} colsCount={colsCount}></Grid>
    </div>
  );
}

export default App;
