import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Rules from './pages/Rules';
import PlayersBrowser from './pages/community/PlayersBrowser';
import Leaderboard from './pages/community/Leaderboard';
import PublicProfile from './pages/community/PublicProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rules" element={<Rules />} /> {/* Новый маршрут */}
        <Route path="/community/players" element={<PlayersBrowser />} />
        <Route path="/community/leaderboard" element={<Leaderboard />} />
        <Route path="/profile/:nick" element={<PublicProfile />} />
      </Routes>
    </Router>
  );
}

export default App;