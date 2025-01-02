import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/user/Dashboard';
import AdminRoutes from './components/admin';
import UserRoutes from './components/user';
import ReportsRoutes from './components/reports';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app-container">
          <aside className="sidebar">
            <nav>
              <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/admin">Admin</Link></li>
                <li><Link to="/user">User</Link></li>
                <li><Link to="/reports">Reports</Link></li>
              </ul>
            </nav>
          </aside>

          <main className="main-content">
            <header className="header">
              <h1>Communication Tracker</h1>
              <div className="user-info">
                <h2>Aqueeb Javed</h2>
              </div>
            </header>

            <div className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/user/*" element={<UserRoutes />} />
                <Route path="/reports/*" element={<ReportsRoutes />} />
              </Routes>
            </div>

            <footer className="footer">
              <p>&copy; 2024 aqueebjaved61@gmail.com. All rights reserved.</p>
            </footer>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;












