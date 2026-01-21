import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaders();
  }, []);

  const fetchLeaders = async () => {
    // Сортируем по балансу (balance) от большего к меньшему
    const { data } = await supabase
      .from('players')
      .select('nickname, balance, custom_rank')
      .order('balance', { ascending: false })
      .limit(10);
    if (data) setLeaders(data);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f13', color: '#fff', padding: '40px 20px', fontFamily: 'Inter' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>← Назад</button>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Forbes <span style={{ color: 'var(--accent-color)' }}>Katori</span></h1>
          <p style={{ color: '#aaa' }}>Топ владельцев Алмазной Руды (АРЫ)</p>
        </div>

        <div className="glass-card" style={{ padding: '0' }}>
          {leaders.map((player, index) => (
            <motion.div 
              key={player.nickname}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}
              style={{ 
                display: 'flex', alignItems: 'center', padding: '20px', 
                borderBottom: index !== leaders.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: index === 0 ? 'rgba(255, 215, 0, 0.05)' : 'transparent' // Подсветка топ-1
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', width: '40px', color: index < 3 ? 'var(--accent-color)' : '#555' }}>
                #{index + 1}
              </div>
              <img src={`https://minotar.net/helm/${player.nickname}/40.png`} alt="" style={{ borderRadius: '8px', marginRight: '15px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{player.nickname}</div>
                <div style={{ fontSize: '0.8rem', color: '#aaa' }}>{player.custom_rank || 'Гражданин'}</div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#4ade80' }}>
                {player.balance} АР
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;