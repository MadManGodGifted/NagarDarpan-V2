import React, { useMemo, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projectsData } = useContext(ProjectContext);
  
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  const project = useMemo(() => {
    return projectsData.find(p => p.id === id || p.id === parseInt(id));
  }, [id, projectsData]);

  if (!project) {
    return (
      <div className="project-details-page">
        <header className="profile-header">
          <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
          <h1>Project Not Found</h1>
        </header>
      </div>
    );
  }

  const navigateToSite = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${project.lat},${project.lng}`, '_blank');
  };

  // Circular Progress Logic
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (project.progress / 100) * circumference;

  return (
    <div className="project-details-page">
      <header className="profile-header" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to Map</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/nagardarpan-logo.png" style={{ height: '28px', width: 'auto' }} alt="Logo" />
          <h1 style={{ margin: 0 }}>Gov-Track Portal</h1>
        </div>
        <div style={{ width: '80px' }}></div> 
      </header>
      
      <main className="details-content-container">
        
        {/* HEROGENZ HEADER */}
        <section className="details-card main-header-card modern-hero">
          <div className="hero-top-badges">
            <span className={`project-type-badge badge-${project.category.toLowerCase()}`} style={{ position: 'static' }}>
              {project.category}
            </span>
            <div className={`status-badge status-${project.status.toLowerCase()}`}>
              {project.status === 'Completed' ? '✅ Completed' : project.status === 'Delayed' ? '⚠️ Delayed' : '⏳ In Progress'}
            </div>
            <div className="verified-badge">🏛️ Public Verified Data</div>
          </div>
          
          <h2 className="hindi-subtitle">आपके क्षेत्र में हो रहा विकास</h2>
          <h1 className="project-title-large gradient-text">{project.name}</h1>
          <p className="microcopy-text">📍 Based on your location &nbsp;•&nbsp; ⏱️ Updated recently</p>

          <div className="hero-metrics-grid">
            {/* Circular Progress */}
            <div className="circular-progress-wrapper">
               <svg width="90" height="90" viewBox="0 0 90 90">
                 <circle cx="45" cy="45" r={radius} fill="none" stroke="#EDF2F7" strokeWidth="8"/>
                 <circle cx="45" cy="45" r={radius} fill="none" stroke="url(#saffronGlow)" strokeWidth="8"
                   strokeDasharray={circumference}
                   strokeDashoffset={strokeDashoffset}
                   strokeLinecap="round"
                   transform="rotate(-90 45 45)"
                 />
                 <defs>
                   <linearGradient id="saffronGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#DD6B20" />
                     <stop offset="100%" stopColor="#D69E2E" />
                   </linearGradient>
                 </defs>
               </svg>
               <div className="circular-text">
                 <strong>{project.progress}%</strong>
               </div>
               <span className="cp-label">Work Progress</span>
            </div>

            <div className="quick-actions-modern">
               <button className="action-button primary-action shine-effect" onClick={navigateToSite}>
                 📍 Take me there
               </button>
            </div>
          </div>
        </section>

        <div className="details-grid-layout">
          {/* LEFT COLUMN */}
          <div className="details-main-col">
            
            {/* Overview (Conversational) */}
            <section className="dashboard-section conversational-card">
              <h3 className="section-heading">👋 What’s happening here and why it matters to you</h3>
              <div className="section-body">
                <p className="description-text">
                  This {project.category.toLowerCase()} initiative is designed to directly improve the infrastructure around your neighborhood. {project.description}
                </p>
                
                <div className="impact-box">
                  <h4 className="sub-heading">Why this matters:</h4>
                  <div className="impact-chips">
                    <span className="chip">🚗 Less traffic</span>
                    <span className="chip">🏥 Better services</span>
                    <span className="chip">🏙️ Area development</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Vertical Timeline */}
            <section className="dashboard-section">
              <h3 className="section-heading">⏳ Project Journey</h3>
              <div className="vertical-timeline">
                <div className={`timeline-node ${project.progress >= 0 ? 'active' : ''}`}>
                  <div className="node-icon">📍</div>
                  <div className="node-content">
                    <h4>Project Started</h4>
                    <p>{project.startDate}</p>
                  </div>
                </div>
                <div className={`timeline-node ${project.progress >= 30 ? 'active' : ''}`}>
                  <div className="node-icon">🏗️</div>
                  <div className="node-content">
                    <h4>Active Work</h4>
                    <p>Foundation & Structure</p>
                  </div>
                </div>
                <div className={`timeline-node ${project.status === 'Completed' ? 'active' : ''}`}>
                  <div className="node-icon">✅</div>
                  <div className="node-content">
                    <h4>Expected Completion</h4>
                    <p>{project.endDate}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Image Gallery */}
            <section className="dashboard-section">
              <h3 className="section-heading">📷 On-ground visuals</h3>
              <div className="horizontal-gallery">
                <div className="gallery-card">
                  <img src="https://images.unsplash.com/photo-1541888085-78082cdb148c?q=80&w=300&auto=format&fit=crop" alt="Construction visual 1" />
                </div>
                <div className="gallery-card">
                  <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=300&auto=format&fit=crop" alt="Architecture visual 2" />
                </div>
                <div className="gallery-card upload-card">
                  <div className="upload-icon">+</div>
                  <p>Upload Photo</p>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="details-side-col">
            
            {/* Financial Details */}
            <section className="dashboard-section">
              <h3 className="section-heading">💰 Project Funds</h3>
              <div className="section-body">
                <div className="finance-row">
                  <span>Total Budget</span>
                  <strong>₹{project.budget} Crore</strong>
                </div>
                <div className="finance-row">
                  <span>Funds Used</span>
                  <strong style={{ color: '#DD6B20' }}>{(project.budget * (project.progress / 100)).toFixed(1)} Cr</strong>
                </div>
              </div>
            </section>

            {/* Administration */}
            <section className="dashboard-section">
              <h3 className="section-heading">🏗️ Administration</h3>
              <div className="section-body">
                <div className="admin-block">
                  <span className="admin-label">Managing Authority</span>
                  <strong className="admin-value">{project.authority}</strong>
                </div>
                <div className="admin-block mt-3">
                  <span className="admin-label">Tender ID</span>
                  <strong className="admin-value">{project.id}-GOV-2024</strong>
                </div>
              </div>
            </section>

            {/* Official Records (Document Cards) */}
            <section className="dashboard-section">
              <h3 className="section-heading">Official Records</h3>
              <div className="section-body doc-grid">
                <div className="doc-card-modern">
                  <span className="doc-icon">📄</span>
                  <div className="doc-info">
                    <h5>Project Report</h5>
                    <p>PDF • 2MB</p>
                  </div>
                </div>
                <div className="doc-card-modern">
                  <span className="doc-icon">📄</span>
                  <div className="doc-info">
                    <h5>Tender Doc</h5>
                    <p>PDF • 1.5MB</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Feedback Gen-Z style */}
            <section className="dashboard-section feedback-genz">
              <h3 className="section-heading-small">What do you think about this project?</h3>
              <div className="rating-stars centered">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star}
                    className={`star-genz ${star <= (hoverRating || rating) ? 'active' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    {star <= (hoverRating || rating) ? '🌟' : '⭐'}
                  </span>
                ))}
              </div>
            </section>

            {/* Report Issue */}
            <section className="dashboard-section report-issue" id="report-issue">
              <h3 className="section-heading-small">Report an Issue</h3>
              <div className="complaint-form-clean">
                <select className="form-input-clean">
                  <option>What's the issue?</option>
                  <option>Slow work</option>
                  <option>Safety hazard</option>
                  <option>Bad materials</option>
                </select>
                <button className="submit-btn danger-btn-clean" onClick={() => alert('Issue reported safely.')}>Submit</button>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectDetails;
