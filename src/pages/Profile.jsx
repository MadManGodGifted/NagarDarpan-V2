import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';

function Profile() {
  const navigate = useNavigate();
  const { userLocation, isDefaultLocation, isLocating, fetchLocation } = useContext(ProjectContext);
  
  const [address, setAddress] = useState('New Delhi, Delhi 110001');
  const [blockId, setBlockId] = useState('ND-BL-402');

  // Simulate reverse geocoding update when location changes
  useEffect(() => {
    if (!isDefaultLocation && userLocation) {
      setAddress('Active Indian Hub Zone');
      setBlockId(`GEO-${Math.abs(Math.floor(userLocation[0] * 100))}-${Math.abs(Math.floor(userLocation[1] * 100))}`);
    } else {
      setAddress('New Delhi, Delhi 110001');
      setBlockId('ND-BL-402');
    }
  }, [userLocation, isDefaultLocation]);

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Map
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/nagardarpan-logo.png" style={{ height: '28px', width: 'auto' }} alt="Logo" />
          <h1 style={{ margin: 0 }}>Gov-ID Dashboard</h1>
        </div>
        <button className="logout-btn" onClick={() => { alert('Logged out securely.'); navigate('/login'); }}>Logout</button>
      </header>

      <div className="profile-content">
        {/* User Card */}
        <section className="profile-card user-card">
          <div className="avatar-section">
            <div className="avatar-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <div className="citizen-score" style={{ marginTop: '0.5rem' }}>
              Citizen User
            </div>
          </div>
          <div className="user-details" style={{ flex: 1 }}>
            <h2>Citizen User</h2>
            <div className="contact-row" style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="section-icon">📱</span>
              <div className="mobile-verification">
                <span>+91 98765 43210</span>
                <span className="badge-verified">✔️ Verified</span>
              </div>
            </div>
          </div>
        </section>

        <div className="profile-grid">
          {/* Main Column */}
          <div className="main-column">
            {/* Aadhaar Verification */}
            <section className="profile-card aadhaar-card">
              <h3 className="section-title"><span className="section-icon">🪪</span> Aadhaar Verification</h3>
              <div className="divider"></div>
              
              <div className="aadhaar-content">
                <div className="aadhaar-data">
                  <span className="aadhaar-label">Aadhaar Number</span>
                  <div className="aadhaar-number">XXXX - XXXX - 1234</div>
                  <div className="status-badge verified-citizen">
                    ✅ Verified Citizen
                  </div>
                </div>
                
                <div className="aadhaar-graphic">
                  <div className="emblem-placeholder">🏛️</div>
                  <div className="gov-text">Govt. of India</div>
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="profile-card location-card">
              <div className="location-header" style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="section-title"><span className="section-icon">📍</span> Current Location</h3>
                <button 
                  className="refresh-btn" 
                  onClick={fetchLocation}
                  disabled={isLocating}
                >
                  {isLocating ? '🔄 Locating...' : '🔄 Refresh Zone'}
                </button>
              </div>
              <div className="divider"></div>
              
              <div className="location-text">
                <p style={{ fontSize: '1.2rem', color: '#2D3748', margin: 0, fontWeight: '500' }}>
                  {isLocating ? 'Resolving location...' : address}
                </p>
                {isDefaultLocation && (
                  <p style={{ fontSize: '0.85rem', color: '#E53E3E', marginTop: '0.5rem', marginBottom: 0 }}>
                    Using default location. Enable GPS for real-time tracking.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Side Column */}
          <div className="side-column">
            {/* Activity */}
            <section className="profile-card activity-card">
              <h3 className="section-title">User Activity</h3>
              <div className="divider"></div>
              <div className="activity-stats">
                <div className="activity-stat">
                  <span className="activity-num">14</span>
                  <span className="activity-label">Projects Viewed</span>
                </div>
                <div className="activity-stat">
                  <span className="activity-num">2</span>
                  <span className="activity-label">Reports Submitted</span>
                </div>
                <div className="activity-stat">
                  <span className="activity-num">5</span>
                  <span className="activity-label">Feedback Given</span>
                </div>
              </div>
            </section>
            
            <section className="trust-badge">
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔒</div>
              <span>Your Aadhaar data is securely verified and not stored.</span>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
