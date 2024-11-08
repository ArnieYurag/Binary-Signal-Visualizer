import React, { useState } from 'react';
import '../styles/Inputs.css';
import RefreshIcon from '../assets/RefreshBtn.png';

const Input = ({ onEncodingChange, onBinaryChange }) => {
  const [encoding, setEncoding] = useState('');
  const [binary, setBinary] = useState('');
  const [error, setError] = useState(false);

  const handleRefresh = () => {
    setEncoding('');
    setBinary('');
    setError(false);
    onEncodingChange('');
    onBinaryChange('');
  };

  const handleEncodingChange = (value) => {
    setEncoding(value);
    onEncodingChange(value);
  };

  const handleBinaryChange = (value) => {
    if (/^[01]*$/.test(value)) {
      setBinary(value);
      setError(false);
      onBinaryChange(value);
    } else {
      setError(true); // Set error state to true, but don't clear `binary`
    }
  };

  return (
    <div className="input-container">
      <button className="refresh-button" onClick={handleRefresh} aria-label="Refresh">
        <img src={RefreshIcon} alt="Refresh" />
      </button>

      <label>
        <select 
          value={encoding}
          onChange={(e) => handleEncodingChange(e.target.value)}
          className="dropdown"
          defaultValue=""
        >
          <option value="" disabled>Select Encoding Technique</option>
          <option value="NRZ-L">NRZ-L</option>
          <option value="NRZ-I">NRZ-I</option>
          <option value="Bipolar AMI">Bipolar AMI</option>
          <option value="Pseudoternary">Pseudoternary</option>
          <option value="Manchester">Manchester</option>
          <option value="Differential Manchester">Differential Manchester</option>
        </select>
      </label>

      <label>
        <input
          type="text"
          placeholder={error ? "Only 0 and 1 are allowed" : "Enter binary data"}
          value={binary}
          onChange={(e) => handleBinaryChange(e.target.value)}
          className={`binary-input ${error ? "input-error" : ""}`}
        />
      </label>
    </div>
  );
};

export default Input;
