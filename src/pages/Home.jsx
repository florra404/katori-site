import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- ДАННЫЕ ---
const features = [
  { title: "Ванильное выживание", desc: "Никаких приватов, /warp и доната на креатив. Только честная игра и доверие." },
  { title: "Voice Chat", desc: "Мы используем PlasmaVoice. Слышно тех, кто рядом. Атмосфера живого общения." },
  { title: "Мощное железо", desc: "Сервер стоит в Европе. Стабильные 20 TPS даже при взрывах динамита." },
  { title: "Ивенты", desc: "Каждую субботу мы собираемся на суде, аукционах или строим общие проекты." },
];

const creators = [
  { nickname: "abcizee", role: "Создатель & Разраб", desc: "Люблю аниме и писать код. Делаю этот мир лучше." },

];

// --- КОМПОНЕНТ СЕКЦИИ ---
const Section = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <div style={{ overflowX: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* === HEADER (Меню) === */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
        style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', 
          padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(15, 15, 19, 0.8)', backdropFilter: 'blur(10px)', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          KATORI<span style={{ color: 'var(--accent-color)' }}>VANILLA</span>
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Главная</Link>
          <Link to="/rules" style={{ color: '#aaa', textDecoration: 'none', transition: '0.2s' }}>Правила</Link>
          <a href="https://discord.gg/y5Dge79Fq4" target="_blank" rel="noreferrer" style={{ color: '#aaa', textDecoration: 'none' }}>Discord</a>
          
          <Link to="/login">
            <button style={{ 
              background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)', 
              padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'
            }}>
              Кабинет
            </button>
          </Link>
        </div>
      </motion.nav>

      {/* === 1. HERO SECTION === */}
      <div style={{ 
        height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'radial-gradient(circle at 50% 30%, #2a1f25 0%, #0f0f13 70%)' }} />

        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', margin: 0, letterSpacing: '-3px', textAlign: 'center', lineHeight: 1 }}
        >
          KATORI<span style={{ color: 'var(--accent-color)' }}>VANILLA</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontSize: '1.5rem', color: '#aaa', marginTop: '20px', textAlign: 'center', padding: '0 20px' }}
        >
          Твой мир. Твоя история.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          style={{ marginTop: '50px', display: 'flex', gap: '20px' }}
        >
           {/* Кнопка ведет на Дискорд */}
           <a href="https://discord.gg/y5Dge79Fq4" target="_blank" rel="noopener noreferrer">
             <button className="btn-primary">Вступить в Discord</button>
           </a>
           
           <Link to="/login">
             <button style={{
               background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', 
               padding: '12px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
             }}>Личный кабинет</button>
           </Link>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: 'absolute', bottom: '30px', opacity: 0.5 }}
        >
          ↓ Листай вниз ↓
        </motion.div>
      </div>

      {/* === 2. О НАС === */}
      <div style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Section>
          <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Почему <span style={{color: 'var(--accent-color)'}}>Katori?</span></h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
            Мы устали от серверов с донатом, приватами и кучей ненужных плагинов. 
            KatoriVanilla — это возвращение к истокам. Здесь ты можешь построить огромный город 
            с друзьями или стать отшельником. Экономика полностью держится на игроках.
          </p>
        </Section>
      </div>

      {/* === 3. ФИШКИ === */}
      <div style={{ background: '#0a0a0c', padding: '100px 0' }}>
        <div className="features-grid">
          {features.map((feature, index) => (
            <Section key={index} delay={index * 0.1}>
              <div className="glass-card">
                <h3 style={{ fontSize: '1.5rem', marginTop: 0, color: 'var(--accent-color)' }}>{feature.title}</h3>
                <p style={{ color: '#aaa' }}>{feature.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </div>

      {/* === 4. КОМАНДА === */}
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <Section>
          <h2 style={{ fontSize: '3rem', marginBottom: '50px' }}>Команда проекта</h2>
          <div className="team-grid">
            {creators.map((member, index) => (
              <div key={index} className="team-member">
                <img 
                  src={`https://minotar.net/helm/${member.nickname}/100.png`} 
                  alt={member.nickname} 
                  className="team-avatar"
                />
                <h3 style={{ margin: '10px 0', fontSize: '1.5rem' }}>{member.nickname}</h3>
                <div style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '10px' }}>{member.role}</div>
                <p style={{ maxWidth: '250px', color: '#888', margin: '0 auto' }}>"{member.desc}"</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* === FOOTER === */}
      <div style={{ padding: '50px', textAlign: 'center', borderTop: '1px solid #222', color: '#555', marginTop: 'auto' }}>
        © 2026 KatoriVanilla. All rights reserved. <br/> Design by Katori.
      </div>
    </div>
  );
};

export default Home;