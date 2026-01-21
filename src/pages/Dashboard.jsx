import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const userNick = localStorage.getItem('user_nick');
  
  // Состояния данных
  const [playerData, setPlayerData] = useState(null);
  const [daysOnServer, setDaysOnServer] = useState(0);

  // Состояния для редактирования
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState('');
  const [newTheme, setNewTheme] = useState('default');

  // Проверка авторизации и загрузка
  useEffect(() => {
    if (!userNick) {
      navigate('/login');
    } else {
      fetchPlayerData();
    }
  }, [userNick, navigate]);

  const fetchPlayerData = async () => {
    const { data } = await supabase
      .from('players')
      .select('*')
      .eq('nickname', userNick)
      .single();
    
    if (data) {
      setPlayerData(data);
      
      // Считаем дни
      const registered = new Date(data.created_at);
      const now = new Date();
      const diffTime = Math.abs(now - registered);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setDaysOnServer(diffDays);

      // Заполняем форму редактирования текущими данными
      setNewBio(data.bio || '');
      setNewTheme(data.theme || 'default');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_nick');
    navigate('/');
  };

  const saveProfile = async () => {
    const { error } = await supabase
      .from('players')
      .update({ bio: newBio, theme: newTheme })
      .eq('nickname', userNick);
    
    if (!error) {
      setIsEditing(false);
      fetchPlayerData(); // Обновляем данные на экране
    } else {
      alert("Ошибка сохранения!");
    }
  };

  // Логика Рангов
  const getRankDisplay = () => {
    if (playerData.custom_rank) {
      return { title: playerData.custom_rank, color: "var(--accent-color)", isCustom: true };
    }
    if (daysOnServer < 7) return { title: "Новичок", color: "#aaa", isCustom: false };
    if (daysOnServer < 30) return { title: "Житель", color: "#4ade80", isCustom: false };
    if (daysOnServer < 90) return { title: "Гражданин", color: "#60a5fa", isCustom: false };
    return { title: "Легенда", color: "#d946ef", isCustom: false };
  };

  // Логика Цвета Репутации
  const getRepColor = (rep) => {
    if (rep >= 100) return '#4ade80';
    if (rep >= 50) return '#fbbf24';
    return '#ef4444';
  };

  // Логика Тем Оформления
  const getThemeStyle = (theme) => {
    switch (theme) {
      case 'dark': return { background: 'linear-gradient(120deg, #1a1a1a 0%, #000 100%)', border: '1px solid #333' };
      case 'gold': return { background: 'linear-gradient(120deg, rgba(255,215,0,0.1) 0%, rgba(0,0,0,0.8) 100%)', border: '1px solid #ffd700' };
      default: return { background: 'linear-gradient(120deg, rgba(255,255,255,0.03) 0%, rgba(255,183,197,0.05) 100%)', border: '1px solid rgba(255,255,255,0.1)' };
    }
  };

  if (!playerData) return <div style={{color: '#fff', textAlign: 'center', marginTop: '20%'}}>Загрузка...</div>;

  const rank = getRankDisplay();
  const reputation = playerData.reputation !== null ? playerData.reputation : 100;
  const repColor = getRepColor(reputation);
  const themeStyle = getThemeStyle(playerData.theme);

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f13', color: '#fff', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Хедер */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Личный кабинет</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer' }}>На главную</button>
          <button onClick={handleLogout} style={{ background: 'rgba(255, 50, 50, 0.1)', color: '#ff5555', border: '1px solid rgba(255,50,50,0.3)', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer' }}>Выйти</button>
        </div>
      </div>

      {/* Меню Сообщества (НОВОЕ) */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <button 
          onClick={() => navigate('/community/players')} 
          className="glass-card" 
          style={{ padding: '20px', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: '#fff', fontSize: '1.1rem' }}
        >
          👥 Найти Граждан
        </button>
        <button 
          onClick={() => navigate('/community/leaderboard')} 
          className="glass-card" 
          style={{ padding: '20px', cursor: 'pointer', textAlign: 'center', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,215,0,0.02)', color: '#ffd700', fontSize: '1.1rem' }}
        >
          🏆 Топ Богачей
        </button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '30px' }}>
        
        {/* === ID CARD (Паспорт) === */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ 
            display: 'flex', alignItems: 'center', gap: '40px', padding: '40px',
            flexWrap: 'wrap',
            ...themeStyle // Применяем стиль выбранной темы
          }}
        >
          {/* Аватар */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: '150px', height: '150px', borderRadius: '20px', overflow: 'hidden', border: `3px solid ${rank.isCustom ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}`, boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
              <img src={`https://minotar.net/helm/${userNick}/150.png`} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Кнопка редактирования */}
            <button 
              onClick={() => setIsEditing(true)}
              style={{ position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#333', border: '1px solid #555', color: '#fff', padding: '5px 15px', borderRadius: '15px', cursor: 'pointer', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
            >
              ✏️ Изм.
            </button>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <h1 style={{ margin: 0, fontSize: '3rem', lineHeight: 1 }}>{userNick}</h1>
              <span style={{ background: rank.color, color: '#000', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                {rank.title}
              </span>
            </div>
            
            {/* Био (НОВОЕ) */}
            <p style={{ color: '#ccc', margin: '0 0 20px 0', fontStyle: 'italic', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
              "{playerData.bio || 'Напишите что-нибудь о себе...'}"
            </p>

            {/* Статы: Репутация и Баланс */}
            <div style={{ display: 'flex', gap: '40px', marginTop: '10px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '5px' }}>
                  <span style={{ color: '#aaa' }}>Репутация</span>
                  <span style={{ color: repColor, fontWeight: 'bold' }}>{reputation}</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', height: '6px', borderRadius: '4px', width: '100%', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(Math.max(reputation, 0), 100)}%` }} style={{ height: '100%', background: repColor }} />
                </div>
              </div>

              <div style={{ flex: 1 }}>
                 <div style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '5px' }}>Баланс (АРЫ)</div>
                 <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fbbf24' }}>
                   💎 {playerData.balance || 0}
                 </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* === СЕТКА ДЕТАЛЕЙ === */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card">
            <h3 style={{ marginTop: 0, color: '#888' }}>Статистика</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.1rem' }}><span>Дней с нами:</span><span style={{ fontWeight: 'bold' }}>{daysOnServer}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}><span>Whitelist:</span><span style={{ color: '#4ade80' }}>Активен ✅</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginTop: '15px' }}><span>ID Гражданина:</span><span style={{ color: '#aaa', fontSize: '0.9rem' }}>#{playerData.id.slice(0, 6)}</span></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ border: '1px solid rgba(255, 255, 0, 0.1)', background: 'rgba(255, 255, 0, 0.02)' }}>
            <h3 style={{ marginTop: 0, color: '#888' }}>Статус сервера</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '20px 0' }}>🚧 Технические работы</p>
            <button onClick={() => window.open('https://discord.gg/ТВОЙ_КОД', '_blank')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#5865F2', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>Перейти в Discord</button>
          </motion.div>
        </div>

      </div>

      {/* === МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ === */}
      {isEditing && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
          <div className="glass-card" style={{ background: '#111', padding: '30px', width: '90%', maxWidth: '400px', border: '1px solid #333' }}>
            <h3 style={{ marginTop: 0 }}>Настройки профиля</h3>
            
            <label style={{ display: 'block', marginBottom: '10px', color: '#aaa', fontSize: '0.9rem' }}>О себе (Био):</label>
            <textarea 
              value={newBio} 
              onChange={(e) => setNewBio(e.target.value)}
              placeholder="Расскажи, кто ты..."
              style={{ width: '100%', height: '80px', background: '#222', border: '1px solid #444', color: '#fff', padding: '10px', borderRadius: '8px', fontFamily: 'inherit', resize: 'none' }}
            />
            
            <label style={{ display: 'block', margin: '20px 0 10px', color: '#aaa', fontSize: '0.9rem' }}>Тема оформления:</label>
            <select 
              value={newTheme} 
              onChange={(e) => setNewTheme(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '8px' }}
            >
              <option value="default">🌸 Сакура (Стандарт)</option>
              <option value="dark">🌑 Ночь (Темная)</option>
              <option value="gold">👑 Золото (Премиум)</option>
            </select>

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsEditing(false)} style={{ background: 'transparent', border: '1px solid #555', color: '#aaa', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}>Отмена</button>
              <button onClick={saveProfile} style={{ background: 'var(--accent-color)', border: 'none', color: '#000', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Сохранить</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;