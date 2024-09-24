import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // state to control sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // toggle the sidebar open/close
  };

  return (
    <div>
      {/* Hamburger Button */}
      <div className="hamburger" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="user-info">
          <div className="logo">workstatus</div>
          <img
            src="cameron.jpg"
            alt="Cameron Williamson"
            className="user-avatar"
          />
          <div className="user-name">Cameron Williamson</div>
          <div className="user-email">cameronwilliamson@gmail.com</div>
        </div>
        <nav className="menu">
          <ul>
            <li className="menu-item"><span>⏱ Timer</span></li>
            <li className="menu-item active"><span>📊 Attendance</span></li>
            <li className="menu-item"><span>📈 Activity</span></li>
            <li className="menu-item"><span>📋 Timesheet</span></li>
            <li className="menu-item"><span>📜 Report</span></li>
            <li className="menu-item"><span>🏢 Jobsite</span></li>
            <li className="menu-item"><span>👥 Team</span></li>
            <li className="menu-item"><span>🛌 Time off</span></li>
            <li className="menu-item"><span>📅 Schedules</span></li>
            <li className="menu-item"><span>🔗 Request to join Organization</span></li>
            <li className="menu-item"><span>🔒 Change Password</span></li>
            <li className="menu-item"><span>🔓 Logout</span></li>
          </ul>
        </nav>
        <div className="footer">
          <ul>
            <li className="menu-item"><span>❓ FAQ & Help</span></li>
            <li className="menu-item"><span>🛡 Privacy Policy</span></li>
            <li className="menu-item"><span>⏰ Version: 2.10(1)</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
