import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PlayersBrowser = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const { data } = await supabase.from('players').select('nickname, reputation, bio, custom_rank, created_at');
    if (data) setPlayers(data);
  };

  // Фильтрация
  const filteredPlayers = players.filter(p => 
    p.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f13', color: '#fff', padding: '40px 20px', fontFamily: 'Inter' }}>
      
      {/* Навигация */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 40px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer' }}>← Назад в Кабинет</button>
        <h1 style={{ margin: 0 }}>Граждане Katori</h1>
      </div>

      {/* Поиск */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 40px' }}>
        <input 
          type="text" 
          placeholder="Найти игрока..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            width: '100%', padding: '15px', borderRadius: '12px', 
            background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', fontSize: '1.1rem'
          }}
        />
      </div>

      {/* Сетка игроков */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredPlayers.map((player) => (
          <motion.div 
            key={player.nickname}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/profile/${player.nickname}`)}
            className="glass-card"
            style={{ cursor: 'pointer', padding: '20px', textAlign: 'center' }}
          >
            <img 
              src={`https://minotar.net/helm/${player.nickname}/64.png`} 
              alt={player.nickname} 
              style={{ width: '64px', height: '64px', borderRadius: '12px', marginBottom: '10px' }}
            />
            <h3 style={{ margin: '0 0 5px 0' }}>{player.nickname}</h3>
            <div style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '10px' }}>
              {player.custom_rank || 'Игрок'}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#666', fontStyle: 'italic' }}>
              "{player.bio?.slice(0, 30)}..."
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlayersBrowser;