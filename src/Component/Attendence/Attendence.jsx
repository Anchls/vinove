import React, { useState } from 'react';
import './Attendence.css';
import LocationMap from '../Map/Map'; // Import the map component
import Sidebar from '../Sidebar/sidebar';
const Attendance = () => {
  const [members, setMembers] = useState([
    {
      name: 'Wade Warren',
      id: 'WSL0003',
      status: 'Working',
      checkIn: '09:30 am',
      checkOut: null,
      avatar: 'wade.jpg',
      loggedIn: true,
      lat: 37.7749, // Example coordinates (San Francisco)
      lng: -122.4194,
    },
    {
      name: 'Esther Howard',
      id: 'WSL0034',
      status: 'Left',
      checkIn: '09:30 am',
      checkOut: '06:40 pm',
      avatar: 'esther.jpg',
      loggedIn: true,
      lat: 34.0522, // Example coordinates (Los Angeles)
      lng: -118.2437,
    },
    {
      name: 'Cameron Williamson',
      id: 'WSL0054',
      status: 'Not logged-in yet',
      checkIn: null,
      checkOut: null,
      avatar: 'cameron.jpg',
      loggedIn: false,
      lat: 40.7128, // Example coordinates (New York)
      lng: -74.0060,
    },
  ]);
  
  const [selectedMember, setSelectedMember] = useState(null);
  const [mapKey, setMapKey] = useState(0); // Initialize the map key state
  const [newMember, setNewMember] = useState({ name: '', id: '', status: '', lat: '', lng: '', avatar: '', loggedIn: false });
  const [showForm, setShowForm] = useState(false); // State to show or hide the form
  
  const handleLocationClick = (member) => {
    setSelectedMember(member); // Set the clicked member as the selected one
    setMapKey(prevKey => prevKey + 1); // Update map key to trigger re-render
  };

  // Function to get the user's location using the Geolocation API
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setNewMember({
            ...newMember,
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          alert('Unable to retrieve your location');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMember.name && newMember.id && newMember.lat && newMember.lng) {
      setMembers([...members, { ...newMember, loggedIn: true, checkIn: new Date().toLocaleTimeString() }]); 
      setNewMember({ name: '', id: '', status: '', lat: '', lng: '', avatar: '', loggedIn: false });
      setShowForm(false); // Hide the form after adding the attendee
    } else {
      alert('Please fill all required fields!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  return (
    <div className='attendance-container'>
      <Sidebar />
    <div className="attendance">
      <div className="header">
        <div className="menu-icon">☰</div>
        <h2>ATTENDANCE</h2>
        <div className="change-link">Change</div>
      </div>

      <div className="members-list">
        {members.map((member, index) => (
          <div className="member-item" key={index}>
            <img src={member.avatar || 'default-avatar.jpg'} alt={member.name} className="avatar" />
            <div className="member-info">
              <div className="member-name">
                {member.name} ({member.id})
              </div>
              <div className="check-info">
                {member.loggedIn ? (
                  <>
                    <span className="check-in">⬆ {member.checkIn}</span>
                    {member.checkOut ? (
                      <span className="check-out">⬇ {member.checkOut}</span>
                    ) : (
                      <span className="status">{member.status}</span>
                    )}
                  </>
                ) : (
                  <span className="status">{member.status}</span>
                )}
              </div>
            </div>
            <div className="actions">
              <button className="calendar-icon">📅</button>
              <button
                className="location-icon"
                onClick={() => handleLocationClick(member)}
              >
                📍
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add a '+' button to show/hide the form */}
      <button className="add-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? '−' : '+'} Add Attendee
      </button>

      {/* Conditionally render the form */}
      {showForm && (
        <form className="add-member-form" onSubmit={handleAddMember}>
          <input
            type="text"
            name="name"
            value={newMember.name}
            placeholder="Name"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="id"
            value={newMember.id}
            placeholder="ID"
            onChange={handleInputChange}
            required
          />
          <button type="button" onClick={handleGetLocation}>
            Get Location (Auto-fill Latitude & Longitude)
          </button>
          <input
            type="text"
            name="lat"
            value={newMember.lat}
            placeholder="Latitude (auto-filled)"
            readOnly
          />
          <input
            type="text"
            name="lng"
            value={newMember.lng}
            placeholder="Longitude (auto-filled)"
            readOnly
          />
          <input
            type="text"
            name="avatar"
            value={newMember.avatar}
            placeholder="Avatar URL (optional)"
            onChange={handleInputChange}
          />
          <button type="submit">Add Attendee</button>
        </form>
      )}

      {selectedMember && (
        <LocationMap
          key={mapKey} // Unique key to force re-render
          lat={selectedMember.lat}
          lng={selectedMember.lng}
          name={selectedMember.name}
          id={selectedMember.id}
          avatar={selectedMember.avatar}
        />
      )}
    </div>
    </div>
  );
};

export default Attendance;
