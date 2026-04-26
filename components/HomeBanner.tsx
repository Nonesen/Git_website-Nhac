'use client';

import React from 'react';
import { Song } from '@/data/constants';

interface HomeBannerProps {
  currentBanner: number;
  trendingSongs: Song[];
  t: (key: string) => string;
}

const HomeBanner: React.FC<HomeBannerProps> = ({ currentBanner, trendingSongs, t }) => {
  const banners = [
    { 
      img: '/img/banner-nature.png', 
      text: "Gói ghém Bình yên", 
      color: '#e0f2fe', 
      bg: 'rgba(0,30,60,0.5)', 
      align: 'flex-start', 
      textAlign: 'left' 
    },
    { 
      img: '/img/banner-house.png', 
      text: "Story hôm nay up bài gì?", 
      color: '#ffedd5', 
      bg: 'rgba(80,30,10,0.4)', 
      align: 'flex-end', 
      textAlign: 'right' 
    },
    { 
      img: '/img/banner-boat.png', 
      text: "Bảng Xếp Hạng\nHot Trong Tuần", 
      color: '#fdf2f2', 
      bg: 'rgba(10,30,60,0.5)', 
      align: 'center', 
      textAlign: 'center',
      featured: trendingSongs.length > 0 ? trendingSongs.slice(0, 3) : null
    },
    { 
      img: '/img/banner-sunset.png', 
      text: "Những Bài Hát\nNghe Nhiều Nhất", 
      color: '#f0f9ff', 
      bg: 'rgba(40,20,10,0.5)', 
      align: 'flex-start', 
      textAlign: 'left',
      featured: trendingSongs.length > 3 ? trendingSongs.slice(3, 6) : null
    }
  ];

  const banner = banners[currentBanner] || banners[0];

  return (
    <section 
      className="hero-section hero-banner" 
      style={{ 
        backgroundImage: `url(${banner.img})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        transition: 'background-image 0.5s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: banner.featured ? 'space-between' : banner.align as any,
        textAlign: banner.textAlign as any,
        height: '240px',
        minHeight: '240px',
        position: 'relative',
        padding: '2rem 3rem',
        gap: '2rem'
      }}
    >
      <div className="hero-content" style={{ 
        background: banner.bg, 
        padding: '1.2rem 2rem', 
        borderRadius: '16px',
        backdropFilter: 'blur(8px)',
        maxWidth: banner.featured ? '45%' : '85%',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ 
            whiteSpace: banner.featured ? 'pre-line' : 'nowrap', 
            fontSize: '1.8rem', 
            color: banner.color,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            marginBottom: '4px',
            lineHeight: '1.2'
        }}>
          {banner.text}
        </h1>
      </div>

      {banner.featured && (
        <div className="banner-featured-list" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '12px',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          minWidth: '260px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          {banner.featured.map((song, idx) => (
            <div key={song.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}>
              <span style={{ color: banner.color, fontWeight: 'bold', fontSize: '0.9rem', width: '20px' }}>{idx + 1}</span>
              <img src={song.cover} alt="" style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                <div style={{ color: 'white', fontSize: '0.9rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>{song.artist}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeBanner;
