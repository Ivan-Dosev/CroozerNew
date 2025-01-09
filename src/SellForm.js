import React, { useState } from 'react';

const SellForm = ({ onBack }) => {
  const [soldBy, setSoldBy] = useState('');
  const [trailerNumber, setTrailerNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the JSON payload
    const jsonPayload = {
      nameAttribute: "Verkauf",
      stringAttribute: [
        { trait_type: "Sold By", value: soldBy },
        { trait_type: "Trailer Number", value: trailerNumber }
      ],
      descriptionAttribute: "Nachweis des Verkaufs",
      addressAttribute: "0x0E183ad336D78929023c7b90af91d67DB0691347",
      ipfsLink: "https://ipfs.io/ipfs/bafkreicjej5zal35zohduz2ljrq42e5cyubxbrmlbjqlb4hiyly2256qbi"
    };

    try {
      const response = await fetch("https://stromzaehler-nft.yanacocha.fit.fraunhofer.de/mint-nft-to-detail", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });

      if (response.ok) {
        alert('Sale request submitted successfully!');
      } else {
        alert('Failed to submit sale request.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the request.');
    }
  };

  return (
    <div style={formStyles.container}>
      <h2 style={formStyles.title}>Sale Request</h2>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <div style={formStyles.field}>
          <label style={formStyles.label}>Sold by:</label>
          <input
            type="text"
            style={formStyles.input}
            value={soldBy}
            onChange={(e) => setSoldBy(e.target.value)}
            required
          />
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>Trailer Number:</label>
          <input
            type="text"
            style={formStyles.input}
            value={trailerNumber}
            onChange={(e) => setTrailerNumber(e.target.value)}
            required
          />
        </div>
        <div style={formStyles.buttonContainer}>
          <button type="button" onClick={onBack} style={formStyles.button}>Back</button>
          <button type="submit" style={formStyles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
};

const formStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    maxWidth: '500px',
    margin: '20px auto', // Center the form
  },
  title: {
    margin: '0',
    fontSize: '28px',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '15px', // Add margin between fields
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    color: '#555',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px', // Add gap between buttons
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007BFF', // Bootstrap primary color
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    width: '100%', // Make buttons full width
  },
};

export default SellForm; 