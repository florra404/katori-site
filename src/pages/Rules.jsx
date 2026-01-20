import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Данные из твоего текста
const rulesData = [
  { 
    id: "2.3.1", 
    title: "RP и MetaGaming", 
    desc: "Отнеситесь к РП серьезно. Ваши действия должны соответствовать лору сервера и роли. MetaGaming (использование информации из реального мира в игре) строго запрещен." 
  },
  
  { 
    id: "2.3.3", 
    title: "Читы и ПО", 
    desc: "Использование программ, дающих несправедливое преимущество (X-Ray, KillAura, макросы, FreeCam и т.д.), карается баном." 
  },
  { 
    id: "2.3.4", 
    title: "Багоюз", 
    desc: "Использование багов и недоработок сервера ради личной выгоды запрещено. О любых ошибках нужно сообщать администрации." 
  },
  { 
    id: "2.3.5", 
    title: "Фермы и Лаг-машины", 
    desc: "Запрещены постройки, вызывающие лаги сервера. Крупные автоматические фермы необходимо согласовывать с администрацией." 
  },
  { 
    id: "2.3.6", 
    title: "Запрещенные постройки", 
    desc: "Запрещено строить оскорбительные объекты, а также сооружения, портящие вид мира (столбы, 'коробки', ямы)." 
  },
  { 
    id: "2.3.7", 
    title: "Поведение в PvP", 
    desc: "PvP должно быть обосновано РП-ситуацией. Запрещены: убийства без причины (DM), убийство в отместку (Revenge Kill) и изображение нереалистичных возможностей (PowerGaming)." 
  },
  { 
    id: "2.4.1", 
    title: "Честная торговля", 
    desc: "Все сделки должны быть прозрачными. Обман и мошенничество при обмене ресурсами или услугами запрещены." 
  },
  { 
    id: "2.4.2", 
    title: "Экономика", 
    desc: "Запрещены действия, ломающие экономику сервера: дюп, массовая раздача ценных ресурсов, создание искусственной инфляции." 
  }
];

const Rules = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#0f0f13', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Хедер */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }}
        style={{ 
          position: 'sticky', top: 0, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(15, 15, 19, 0.9)', backdropFilter: 'blur(10px)', zIndex: 100, borderBottom: '1px solid #222'
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
          KATORI<span style={{ color: 'var(--accent-color)' }}>VANILLA</span>
        </Link>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#aaa', textDecoration: 'none', transition: '0.3s' }}>Главная</Link>
          <Link to="/rules" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>Правила</Link>
          <Link to="/login">
            <button style={{ background: 'transparent', border: '1px solid #444', color: '#fff', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer' }}>
              Кабинет
            </button>
          </Link>
        </div>
      </motion.nav>

      {/* Контент */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h1 style={{ fontSize: '3rem', margin: '0 0 20px 0' }}>
            Правила <span style={{ color: 'var(--accent-color)' }}>Сервера</span>
          </h1>
          <p style={{ color: '#aaa', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' }}>
            Эти правила регулируют ваше поведение и взаимодействие в игровом мире Minecraft, 
            чтобы РП процесс был честным и интересным для всех.
          </p>
        </motion.div>

        {/* Сетка правил */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {rulesData.map((rule, index) => (
            <motion.div 
              key={rule.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card"
              style={{ 
                padding: '25px', 
                borderLeft: '3px solid var(--accent-color)',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                <span style={{ 
                  fontFamily: 'monospace', color: 'var(--accent-color)', 
                  background: 'rgba(255, 183, 197, 0.1)', padding: '4px 8px', borderRadius: '6px' 
                }}>
                  § {rule.id}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.3rem' }}>{rule.title}</h3>
              </div>
              <p style={{ color: '#ccc', lineHeight: '1.6', margin: 0 }}>
                {rule.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '80px', color: '#555', fontSize: '0.9rem' }}>
          <p>Администрация оставляет за собой право изменять правила в любое время.</p>
        </div>
      </div>

    </div>
  );
};

export default Rules;