import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const PublicProfile = () => {
  const { nick } = useParams(); // Берем ник из URL
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase.from('players').select('*').eq('nickname', nick).single();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, [nick]);

  if (!profile) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '50px' }}>Загрузка...</div>;

  // Темы оформления (простой вариант)
  const bgColors = {
    'default': 'linear-gradient(120deg, rgba(255,255,255,0.03) 0%, rgba(255,183,197,0.05) 100%)',
    'dark': 'linear-gradient(120deg, #1a1a1a 0%, #000 100%)',
    'gold': 'linear-gradient(120deg, rgba(255,215,0,0.1) 0%, rgba(0,0,0,0.8) 100%)'
  };
  const currentBg = bgColors[profile.theme] || bgColors['default'];

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f13', color: '#fff', padding: '40px 20px', fontFamily: 'Inter' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', background: 'transparent', color: '#aaa', border: 'none', cursor: 'pointer' }}>← Назад</button>
      
      <div className="glass-card" style={{ 
          maxWidth: '800px', margin: '0 auto', padding: '40px', 
          background: currentBg, border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap'
      }}>
        <img 
          src={`https://minotar.net/armor/body/${profile.nickname}/150.png`} 
          alt={profile.nickname} 
          style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '3rem' }}>{profile.nickname}</h1>
          <span style={{ background: '#333', padding: '4px 10px', borderRadius: '4px', fontSize: '0.9rem' }}>
            {profile.custom_rank || 'Гражданин'}
          </span>
          
          <p style={{ marginTop: '20px', fontSize: '1.1rem', fontStyle: 'italic', color: '#ddd' }}>
            "{profile.bio}"
          </p>

          <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
            <div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Репутация</div>
              <div style={{ fontWeight: 'bold', color: profile.reputation >= 0 ? '#4ade80' : '#f87171' }}>{profile.reputation}</div>
            </div>
            <div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Состояние</div>
              <div style={{ fontWeight: 'bold', color: '#fbbf24' }}>{profile.balance} АР</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;