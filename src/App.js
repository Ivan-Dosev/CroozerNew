// src/App.js
import React, { useState } from 'react';
import './App.css'; // Optional: for styling
import ServiceForm from './ServiceForm'; // Import the ServiceForm component
import SellForm from './SellForm'; // Import the SellForm component

function App() {
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);

  const handleServiceClick = () => {
    setShowServiceForm(true);
    setShowSellForm(false);
  };

  const handleSellClick = () => {
    setShowSellForm(true);
    setShowServiceForm(false);
  };

  const handleBackClick = () => {
    setShowServiceForm(false);
    setShowSellForm(false);
  };

  return (
    <div className="App" style={styles.container}>
      {showServiceForm ? (
        <ServiceForm onBack={handleBackClick} />
      ) : showSellForm ? (
        <SellForm onBack={handleBackClick} />
      ) : (
        <>
          <img src={`${process.env.PUBLIC_URL}/croozer.png`} alt="Croozer Logo" style={styles.image} />
          <h1 style={styles.title}>Welcome to your dashboard</h1>
          <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={handleServiceClick}>Service</button>
            <button style={styles.button} onClick={handleSellClick}>Re-sell</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '0 20px',
    backgroundColor: '#f0f0f0', // Light background color
  },
  image: {
    marginBottom: '20px',
    maxWidth: '80%', // Make the image responsive
    height: 'auto',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    margin: '20px 0', // Add margin for spacing
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', // Add gap between buttons
  },
  button: {
    padding: '15px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF', // Bootstrap primary color
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    width: '100%', // Make buttons full width
    maxWidth: '300px', // Limit button width
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', // Add shadow for depth
  },
};

export default App;