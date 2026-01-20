import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const userNick = localStorage.getItem('user_nick');
  const [playerData, setPlayerData] = useState(null);
  const [daysOnServer, setDaysOnServer] = useState(0);

  useEffect(() => {
    if (!userNick) navigate('/login');
    else fetchPlayerData();
  }, [userNick, navigate]);

  const fetchPlayerData = async () => {
    const { data } = await supabase
      .from('players')
      .select('*')
      .eq('nickname', userNick)
      .single();
    
    if (data) {
      setPlayerData(data);
      const registered = new Date(data.created_at);
      const now = new Date();
      const diffTime = Math.abs(now - registered);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setDaysOnServer(diffDays);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_nick');
    navigate('/');
  };

  // ЛОГИКА ЗВАНИЙ (Гибридная)
  const getRankDisplay = () => {
    // 1. Если админ выдал звание вручную (через !rank), используем его
    if (playerData.custom_rank) {
      return { title: playerData.custom_rank, color: "var(--accent-color)", isCustom: true };
    }

    // 2. Иначе считаем автоматически
    if (daysOnServer < 7) return { title: "Новичок", color: "#aaa", isCustom: false };
    if (daysOnServer < 30) return { title: "Житель", color: "#4ade80", isCustom: false };
    if (daysOnServer < 90) return { title: "Гражданин", color: "#60a5fa", isCustom: false };
    return { title: "Легенда", color: "#d946ef", isCustom: false };
  };

  // ЛОГИКА ЦВЕТА РЕПУТАЦИИ
  const getRepColor = (rep) => {
    if (rep >= 100) return '#4ade80'; // Зеленый
    if (rep >= 50) return '#fbbf24';  // Желтый
    return '#ef4444';                 // Красный
  };

  if (!playerData) return <div style={{color: '#fff', textAlign: 'center', marginTop: '20%'}}>Загрузка...</div>;

  const rank = getRankDisplay();
  const reputation = playerData.reputation || 100; // Если null, считаем 100
  const repColor = getRepColor(reputation);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f13', color: '#fff', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Хедер */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Личный кабинет</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer' }}>На главную</button>
          <button onClick={handleLogout} style={{ background: 'rgba(255, 50, 50, 0.1)', color: '#ff5555', border: '1px solid rgba(255,50,50,0.3)', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}>Выйти</button>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '30px' }}>
        
        {/* === ID CARD === */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ 
            display: 'flex', alignItems: 'center', gap: '40px', padding: '40px',
            background: 'linear-gradient(120deg, rgba(255,255,255,0.03) 0%, rgba(255,183,197,0.05) 100%)',
            border: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap'
          }}
        >
          {/* Аватар */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '20px', overflow: 'hidden', border: `3px solid ${rank.isCustom ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}`, boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
              <img src={`https://minotar.net/helm/${userNick}/150.png`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '3rem', lineHeight: 1 }}>{userNick}</h1>
              <span style={{ background: rank.color, color: '#000', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                {rank.title}
              </span>
            </div>
            
            <p style={{ color: '#aaa', margin: '0 0 20px 0' }}>Гражданин KatoriVanilla • ID: {playerData.id.slice(0, 8)}...</p>

            {/* ШКАЛА РЕПУТАЦИИ */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                <span style={{ color: '#aaa' }}>Репутация</span>
                <span style={{ color: repColor, fontWeight: 'bold' }}>{reputation} / 100</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', height: '8px', borderRadius: '4px', width: '100%', maxWidth: '400px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${Math.min(Math.max(reputation, 0), 100)}%` }} 
                  transition={{ duration: 1 }}
                  style={{ height: '100%', background: repColor, boxShadow: `0 0 10px ${repColor}` }} 
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* === СЕТКА ИНФО === */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card">
            <h3 style={{ marginTop: 0, color: '#888' }}>Статистика</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.1rem' }}><span>Дней с нами:</span><span style={{ fontWeight: 'bold' }}>{daysOnServer}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}><span>Whitelist:</span><span style={{ color: '#4ade80' }}>Активен ✅</span></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ border: '1px solid rgba(255, 255, 0, 0.1)', background: 'rgba(255, 255, 0, 0.02)' }}>
            <h3 style={{ marginTop: 0, color: '#888' }}>Статус сервера</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '20px 0' }}>🚧 Технические работы</p>
            <button onClick={() => window.open('https://discord.gg/ТВОЙ_КОД', '_blank')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#5865F2', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Перейти в Discord</button>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;