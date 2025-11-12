import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaDoorOpen, FaMicrochip, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const RoomCard = ({ room, onDelete, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="room-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="room-card-inner">
        <div className="room-icon">
          <FaDoorOpen size={24} />
        </div>
        <div className="room-details">
          <h3>{room.name || 'Unnamed Room'}</h3>
          <p className="device-id">
            <FaMicrochip size={12} /> {room.deviceID || 'No Device ID'}
          </p>
        </div>
        <div className={`room-actions ${isHovered ? 'visible' : ''}`}>
          <button 
            className="btn-icon edit"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(room);
            }}
            aria-label="Edit room"
            title="Edit room"
          >
            <FaEdit size={14} />
          </button>
          <button 
            className="btn-icon delete"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(room._id);
            }}
            aria-label="Delete room"
            title="Delete room"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({ 
    name: '', 
    deviceID: '',
    isEditing: false,
    editingId: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = "https://person-tracking-backend.onrender.com/api";

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/rooms`);
      setRooms(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch rooms. Please try again.');
      console.error('Error fetching rooms:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      deviceID: '',
      isEditing: false,
      editingId: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.deviceID.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      
      if (formData.isEditing) {
        await axios.put(`${API_URL}/rooms/${formData.editingId}`, {
          name: formData.name,
          deviceID: formData.deviceID
        });
        setSuccess('Room updated successfully!');
      } else {
        await axios.post(`${API_URL}/addRoom`, {
          name: formData.name,
          deviceID: formData.deviceID
        });
        setSuccess('Room added successfully!');
      }
      
      resetForm();
      fetchRooms();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      console.error('Error saving room:', err);
    }
  };

  const handleEdit = (room) => {
    setFormData({
      name: room.name,
      deviceID: room.deviceID,
      isEditing: true,
      editingId: room._id
    });
    
    // Scroll to form
    document.getElementById('room-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await axios.delete(`${API_URL}/rooms/${id}`);
        setSuccess('Room deleted successfully!');
        fetchRooms();
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
        
      } catch (err) {
        setError('Failed to delete room. Please try again.');
        console.error('Error deleting room:', err);
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="admin-header"
        >
          <h1>Room Management</h1>
          <p>Add, edit, or remove rooms and their associated devices</p>
        </motion.div>
      </div>

      <div className="admin-content">
        <motion.div 
          className="admin-card form-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="card-header">
            <h2>{formData.isEditing ? '✏️ Edit Room' : '➕ Add New Room'}</h2>
            {formData.isEditing && (
              <button 
                className="btn btn-outline"
                type="button"
                onClick={resetForm}
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
          
          <form id="room-form" onSubmit={handleSubmit} className="room-form">
            <AnimatePresence>
              {error && (
                <motion.div 
                  className="alert alert-error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div 
                  className="alert alert-success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {success}
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="form-group">
              <label htmlFor="name">Room Name</label>
              <div className="input-with-icon">
                <FaDoorOpen className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Living Room, Bedroom"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="deviceID">Device ID</label>
              <div className="input-with-icon">
                <FaMicrochip className="input-icon" />
                <input
                  type="text"
                  id="deviceID"
                  name="deviceID"
                  value={formData.deviceID}
                  onChange={handleInputChange}
                  placeholder="Enter device identifier"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="spinner" /> Processing...
                </>
              ) : formData.isEditing ? (
                <>
                  <FaSave /> Update Room
                </>
              ) : (
                <>
                  <FaPlus /> Add Room
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div 
          className="rooms-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="section-header">
            <h2>Your Rooms</h2>
            <span className="badge">{rooms.length} {rooms.length === 1 ? 'Room' : 'Rooms'}</span>
          </div>
          
          {isLoading && !rooms.length ? (
            <div className="loading-state">
              <FaSpinner className="spinner" />
              <p>Loading rooms...</p>
            </div>
          ) : rooms.length === 0 ? (
            <div className="empty-state">
              <img src="/empty-state.svg" alt="No rooms" className="empty-illustration" />
              <h3>No Rooms Found</h3>
              <p>Get started by adding your first room</p>
            </div>
          ) : (
            <div className="rooms-grid">
              <AnimatePresence>
                {rooms.map((room) => (
                  <motion.div
                    key={room._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RoomCard
                      room={room}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              <p>Add your first room to get started with tracking.</p>
            </div>
          )}
        </motion.div>
      </div>
      
      <div className="admin-footer">
        <p>System Status: <span className="status-online">Operational</span></p>
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
}
