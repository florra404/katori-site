import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import bcrypt from 'bcryptjs';

const Login = () => {
  const navigate = useNavigate();
  
  // --- НОВАЯ ФИШКА: АВТО-ВХОД ---
  // Если пользователь уже был на сайте, сразу кидаем в кабинет
  useEffect(() => {
    const savedNick = localStorage.getItem('user_nick');
    if (savedNick) {
      navigate('/dashboard');
    }
  }, [navigate]);
  // ------------------------------

  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Ищем пользователя в базе
      const { data, error: dbError } = await supabase
        .from('players')
        .select('*')
        .eq('nickname', nickname)
        .single();

      if (dbError || !data) {
        throw new Error('Игрок с таким ником не найден в вайтлисте.');
      }

      // 2. Проверяем пароль
      const isMatch = await bcrypt.compare(password, data.password_hash);

      if (!isMatch) {
        throw new Error('Неверный пароль.');
      }

      // 3. УСПЕХ
      localStorage.setItem('user_nick', nickname);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 50%, #1f1f25 0%, #0f0f13 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Фон */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(255,183,197,0.05) 0%, transparent 70%)',
          zIndex: 0
        }}
      />

      {/* Карточка */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          zIndex: 1,
          width: '100%', maxWidth: '400px', padding: '40px',
          background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>
          Вход в <span style={{ color: 'var(--accent-color)' }}>Katori</span>
        </h2>

        {error && (
          <div style={{
            background: 'rgba(255, 50, 50, 0.1)', color: '#ff5555',
            padding: '10px', borderRadius: '8px', marginBottom: '20px',
            fontSize: '0.9rem', textAlign: 'center', border: '1px solid rgba(255, 50, 50, 0.2)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '0.9rem' }}>Твой Никнейм</label>
            <input 
              type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Steve"
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#888', fontSize: '0.9rem' }}>Пароль (от бота)</label>
            <input 
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Проверка...' : 'Войти в систему'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;