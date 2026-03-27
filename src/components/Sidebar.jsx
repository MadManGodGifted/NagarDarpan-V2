import React, { useState, useRef } from 'react';

const Sidebar = ({ projects, onProjectClick, activeProject, isMobileOpen, toggleMobileOpen }) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const y = e.touches[0].clientY;
    const deltaY = y - startY.current;
    
    if (isMobileOpen) {
      if (deltaY > 0) setDragY(deltaY);
      else setDragY(deltaY * 0.15); // resistance
    } else {
      if (deltaY < 0) setDragY(deltaY);
      else setDragY(deltaY * 0.15); // resistance
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (isMobileOpen && dragY > 80) {
      toggleMobileOpen();
    } else if (!isMobileOpen && dragY < -50) {
      toggleMobileOpen();
    }
    setDragY(0);
  };

  // Use passed projects for active view stats
  const total = projects.length;
  const ongoing = projects.filter(p => p.status === 'Ongoing').length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const delayed = projects.filter(p => p.status === 'Delayed').length;

  // Calculate widths for horizontal progress bar
  const completedPct = total ? (completed / total) * 100 : 0;
  const ongoingPct = total ? (ongoing / total) * 100 : 0;
  const delayedPct = total ? (delayed / total) * 100 : 0;

  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDisplayProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.authority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dragStyle = {
    '--drag-y': `${dragY}px`,
    ...(isDragging ? { transition: 'none' } : {})
  };

  return (
    <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`} style={dragStyle}>
      {/* Mobile drag handle */}
      <div 
        className="mobile-drag-handle" 
        onClick={toggleMobileOpen}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="drag-bar"></div>
      </div>

      {/* Premium Stats Card */}
      <div className="smart-stats-card">
        <div className="stats-grid-row">
          <div className="stat-item total-stat">
            <span className="stat-icon">📊</span>
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item ongoing-stat">
            <span className="stat-icon">⏳</span>
            <div className="stat-value">{ongoing}</div>
            <div className="stat-label">Ongoing</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item completed-stat">
            <span className="stat-icon">✔️</span>
            <div className="stat-value">{completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
        
        {/* Progress Bar Layer */}
        <div className="stats-progress-container">
          <div className="progress-bar-wrapper">
             <div className="progress-segment completed-segment" style={{ width: `${completedPct}%` }} title={`Completed: ${completedPct.toFixed(0)}%`}></div>
             <div className="progress-segment ongoing-segment" style={{ width: `${ongoingPct}%` }} title={`Ongoing: ${ongoingPct.toFixed(0)}%`}></div>
             <div className="progress-segment delayed-segment" style={{ width: `${delayedPct}%` }} title={`Delayed: ${delayedPct.toFixed(0)}%`}></div>
          </div>
        </div>
      </div>

      <div className="gradient-divider"></div>

      <div className="sidebar-header-modern" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px 20px', borderBottom: '1px solid #edf2f7' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
          <div className="header-titles" style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2d3748', margin: '0 0 4px 0', lineHeight: 1.2 }}>🏗️ Local Infrastructure</h2>
            <p className="header-subtext" style={{ fontSize: '0.85rem', color: '#718096', margin: 0 }}>Projects around your current block</p>
          </div>
          <div className="project-count-pill" style={{ flexShrink: 0, background: '#ebf8ff', color: '#2b6cb0', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid #bee3f8' }}>
            📍 {total} Projects
          </div>
        </div>
        <div className="project-search" style={{ width: '100%' }}>
          <input 
            type="text" 
            placeholder="Search projects by name or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '14px',
              backgroundColor: '#F7FAFC',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
              color: '#4A5568'
            }}
          />
        </div>
      </div>
      
      <div className="project-list">
        {filteredDisplayProjects.length === 0 ? (
          <div className="empty-state">
            <p>{searchQuery ? 'No matching projects found' : 'No active projects in this area'}</p>
          </div>
        ) : (
          filteredDisplayProjects.map(project => (
            <div 
              key={project.id} 
              className={`project-card ${activeProject?.id === project.id ? 'active-card' : ''}`}
              onClick={() => onProjectClick(project)}
            >
              <div className="card-header">
                <span className={`project-type-badge badge-${project.category.replace(/\s+/g, '-').toLowerCase()}`}>{project.category}</span>
              </div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-authority">By: {project.authority}</p>
              <p className="project-status">
                Status: <span className={`status-${project.status.replace(/\s+/g, '-').toLowerCase()}`}>{project.status}</span>
              </p>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
