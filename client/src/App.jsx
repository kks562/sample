import React, { useState, useEffect } from 'react';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [dataList, setDataList] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: inputValue })
      });
      if (response.ok) {
        alert('Data saved successfully!');
        setInputValue(''); // Clear the input field
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data');
      const data = await response.json();
      setDataList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Data Submission App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder='Enter data'
        />
        <button type='submit'>Submit</button>
      </form>

      <button onClick={fetchData}>Retrieve Data</button>

      <ul>
        {dataList.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
