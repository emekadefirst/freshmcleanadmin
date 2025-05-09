/* eslint-disable no-unused-vars */
import React from 'react';

const MiniLoader = () => {
  const styles = `
    .mini-loader {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .spinner {
      border-radius: 50%;
      height: 1.5rem;
      width: 1.5rem;
      border-width: 0.2rem;
      border-style: solid;
      border-color: transparent;
      border-top-color: #00ff00; 
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="mini-loader">
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default MiniLoader;
