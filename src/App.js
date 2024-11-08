import React, { useState } from 'react';
import './App.css';
import WindowInterface from './components/WindowInterface';
import Input from './components/Inputs';
import Output from './components/Output';

function App() {
  const [encoding, setEncoding] = useState('');
  const [binary, setBinary] = useState('');
  return (
    <div className="App">
      <h1 className="app-title">Binary Signal Encoding Visualizer</h1>
      <WindowInterface>
      <Input onEncodingChange={setEncoding} onBinaryChange={setBinary} />
      <Output encoding={encoding} binary={binary} />
      </WindowInterface>
    </div>
  );
}

export default App;
