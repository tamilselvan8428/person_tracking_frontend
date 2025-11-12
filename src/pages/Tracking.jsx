import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { FaUser, FaMapMarkerAlt, FaWifi, FaSync, FaUserClock } from 'react-icons/fa';
import { FaWifi as FaWifiOff } from 'react-icons/fa6';
import './Tracking.css';

const StatusBadge = ({ status }) => (
  <span className={`status-badge ${status.toLowerCase()}`}>
    {status === 'Online' ? <FaWifi /> : <FaWifiOff />}
    <span>{status}</span>
  </span>
);

export default function Tracking() {
  const [persons, setPersons] = useState([]);
  const [tab, setTab] = useState('tracking');
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  const refreshData = () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Replace with your backend LAN IP
    const socket = io("http://localhost:5005");

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
    });

    socket.on("updatePersons", (data) => {
      console.log("📡 Received data:", data);
      setPersons(data);
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Disconnected from socket server");
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="tracking-page">
      <header className="page-header">
        <div>
          <h1>Device Tracking</h1>
          <p className="last-updated">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <button 
          className="refresh-btn" 
          onClick={refreshData}
          disabled={isLoading}
        >
          <FaSync className={isLoading ? 'spinning' : ''} />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </header>

      <div className="tabs">
        <button
          onClick={() => setTab('persons')}
          className={tab === 'persons' ? 'active' : ''}
        >
          <FaUser /> Person List
        </button>
        <button
          onClick={() => setTab('tracking')}
          className={tab === 'tracking' ? 'active' : ''}
        >
          <FaMapMarkerAlt /> Tracking View
        </button>
      </div>

      <div className="content-area">
        {isLoading && persons.length === 0 ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading device data...</p>
          </div>
        ) : persons.length === 0 ? (
          <div className="empty-state">
            <FaUserClock size={48} />
            <h3>No devices found</h3>
            <p>Devices will appear here when connected</p>
          </div>
        ) : (
          <div className="device-grid">
            {persons.map((person) => (
              <div key={person.deviceID} className="device-card">
                <div className="device-header">
                  <h3 className="device-name">
                    <FaUser className="icon" />
                    {person.name}
                  </h3>
                  <StatusBadge status={person.status} />
                </div>
                
                <div className="device-details">
                  <div className="detail-row">
                    <span className="label">Device ID:</span>
                    <span className="value">{person.deviceID}</span>
                  </div>
                  
                  {tab === 'tracking' && (
                    <div className="detail-row">
                      <span className="label">
                        <FaMapMarkerAlt className="icon" /> Location:
                      </span>
                      <span className="value">{person.room || 'Unknown'}</span>
                    </div>
                  )}
                  
                  <div className="detail-row">
                    <span className="label">Last Seen:</span>
                    <span className="value">
                      {new Date(person.lastSeen).toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="device-actions">
                  <button className="action-btn">Details</button>
                  <button className="action-btn primary">Track</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
    