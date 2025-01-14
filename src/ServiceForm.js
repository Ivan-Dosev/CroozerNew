import React, { useState } from 'react';
import AlertModal from './AlertModal';

const ServiceForm = ({ onBack }) => {
  const [repairedBy, setRepairedBy] = useState('');
  const [repairDescription, setRepairDescription] = useState('');
  const [trailerNumber, setTrailerNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [repairDate, setRepairDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create the JSON payload
    const jsonPayload = {
      nameAttribute: "Reparaturnachweis",
      stringAttribute: [
        { trait_type: "NFT_Type", value: "Croozer" },
        { trait_type: "Repaired By", value: repairedBy },
        { trait_type: "Repair Description", value: repairDescription },
        { trait_type: "Trailer Number", value: trailerNumber },
        { trait_type: "Repair Date", value: repairDate }
      ],
      descriptionAttribute: "Nachweis der Reparatur",
      addressAttribute: "0x0E183ad336D78929023c7b90af91d67DB0691347",
      ipfsLink: "https://ipfs.io/ipfs/bafybeig5pzsui6oxpei6sn6axrspht43iglnrnq5qwnevud5isks47kfwu"
    };

    try {
      const response = await fetch("/mint-nft-to-detail", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });

      if (response.ok) {
        setModalMessage('Service request submitted successfully!');
        setShowModal(true);
        // Clear form after successful submission
        setRepairedBy('');
        setRepairDescription('');
        setTrailerNumber('');
        setRepairDate('');
      } else {
        setModalMessage('Failed to submit service request.');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('An error occurred while submitting the request.');
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={formStyles.container}>
      <AlertModal 
        isOpen={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
      <h2 style={formStyles.title}>Service Request</h2>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        <div style={formStyles.field}>
          <label style={formStyles.label}>Repaired by:</label>
          <input
            type="text"
            style={formStyles.input}
            value={repairedBy}
            onChange={(e) => setRepairedBy(e.target.value)}
            required
          />
        </div>
        <div style={formStyles.field}>
          <label style={formStyles.label}>Repair Description:</label>
          <textarea
            style={formStyles.input}
            value={repairDescription}
            onChange={(e) => setRepairDescription(e.target.value)}
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
        <div style={formStyles.field}>
          <label style={formStyles.label}>Repair Date:</label>
          <input
            type="date"
            style={formStyles.input}
            value={repairDate}
            onChange={(e) => setRepairDate(e.target.value)}
            readOnly
            required
          />
        </div>
        <div style={formStyles.buttonContainer}>
          <button type="button" onClick={onBack} style={formStyles.button} disabled={isLoading}>Back</button>
          <button type="submit" style={formStyles.button} disabled={isLoading}>
            {isLoading ? (
              <div style={formStyles.spinnerContainer}>
                <div style={formStyles.spinner}></div>
                <span style={formStyles.spinnerText}>Submitting...</span>
              </div>
            ) : (
              'Submit'
            )}
          </button>
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
  spinnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    animation: 'spin 1s ease-in-out infinite',
  },
  spinnerText: {
    color: '#fff',
  },
  '@keyframes spin': {
    to: {
      transform: 'rotate(360deg)',
    },
  },
};

// Add the keyframes animation to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(styleSheet);

export default ServiceForm; 