'use client';

import { useState, useEffect } from 'react';

interface StatsResponse {
  totalFortunes: number;
  totalRevenue: string;
  categories: {
    love: number;
    career: number;
    wisdom: number;
    random: number;
  };
}

interface FortuneResponse {
  success: boolean;
  fortune: string;
  category: string;
  timestamp: string;
  message: string;
}

export default function Home() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('random');
  const [fortune, setFortune] = useState<FortuneResponse | null>(null);
  const [error, setError] = useState('');
  const [showFortune, setShowFortune] = useState(false);

  const categories = [
    { id: 'random', name: 'Random', icon: '🎲', desc: 'Surprise me!' },
    { id: 'love', name: 'Love', icon: '❤️', desc: 'Matters of the heart' },
    { id: 'career', name: 'Career', icon: '💼', desc: 'Professional destiny' },
    { id: 'wisdom', name: 'Wisdom', icon: '🧠', desc: 'Universal truths' },
  ];

  // Load stats on mount
  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleGetFortune = async () => {
    setLoading(true);
    setError('');
    setFortune(null);
    setShowFortune(false);

    try {
      const response = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Failed to get fortune');
      }

      const result = await response.json();
      setFortune(result);
      setShowFortune(true);
      await loadStats();
    } catch (error: any) {
      console.error('Fortune error:', error);
      setError(error.message || 'Failed to get fortune');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="oracle-image">
          <img
            src="/image.png"
            alt="Mystical Oracle"
            className="oracle-img"
          />
        </div>
        <h1 className="title">AI Fortune Teller</h1>
        <p className="subtitle">Degen Oracle • Powered by x402 & OpenAI</p>
      </header>

      {stats && (
        <div className="stats-bar">
          <div className="stat">
            <div className="stat-value">{stats.totalFortunes}</div>
            <div className="stat-label">Fortunes Told</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.totalRevenue}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
          <div className="stat">
            <div className="stat-value">$0.01</div>
            <div className="stat-label">Per Reading</div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="main-content">
          {!showFortune ? (
            <>
              <div className="section">
                <h2>Choose Your Path</h2>
                <div className="categories">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                      disabled={loading}
                    >
                      <div className="category-icon">{cat.icon}</div>
                      <div className="category-name">{cat.name}</div>
                      <div className="category-desc">{cat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="fortune-btn"
                onClick={handleGetFortune}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Consulting the Oracle...
                  </>
                ) : (
                  '🔮 Reveal My Fortune • FREE (Demo Mode)'
                )}
              </button>

              {error && (
                <div className="error-message">⚠️ {error}</div>
              )}
            </>
          ) : (
            <div className="fortune-reveal">
              <div className="fortune-card">
                <div className="fortune-header">
                  <span className="fortune-icon">
                    {categories.find(c => c.id === fortune?.category)?.icon || '🔮'}
                  </span>
                  <h2>{fortune?.message}</h2>
                </div>

                <div className="fortune-text">
                  "{fortune?.fortune}"
                </div>

                <div className="fortune-meta">
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{fortune?.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Cost:</span>
                    <span className="meta-value">FREE (Demo)</span>
                  </div>
                </div>

                <button
                  className="another-btn"
                  onClick={() => setShowFortune(false)}
                >
                  Get Another Fortune
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
