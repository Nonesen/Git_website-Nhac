'use client';

import React from 'react';

interface Feedback {
    id: string | number;
    _id?: string;
    email: string;
    message: string;
    timestamp: string;
}

interface AdminStatsProps {
    songsCount: number;
    feedbacks: Feedback[];
    setFeedbacks: React.Dispatch<React.SetStateAction<Feedback[]>>;
    onClearAllFeedback: () => void;
}

const AdminStats: React.FC<AdminStatsProps> = ({ 
    songsCount, 
    feedbacks, 
    setFeedbacks, 
    onClearAllFeedback 
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* TOP STATS */}
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Tổng bài hát</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{songsCount}</p>
                </div>
                <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                        Phiếu góp ý {feedbacks.length > 0 && <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem' }}>NEW</span>}
                    </h3>
                    <p style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>{feedbacks.length}</p>
                </div>
                <div className="stat-card" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Trạng thái</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 800, color: '#22c55e' }}>ONLINE</p>
                </div>
            </div>

            {/* PREMIUM FEEDBACK LIST */}
            <div className="admin-feedback-section">
                <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>
                        <i className="fa-solid fa-envelope-open-text" style={{ marginRight: '10px', color: 'var(--primary-light)' }}></i>
                        Danh sách phiếu phản hồi
                    </h3>
                    {feedbacks.length > 0 && (
                        <button onClick={onClearAllFeedback} className="btn-clear-all" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                            Xóa tất cả phiếu
                        </button>
                    )}
                </div>

                {feedbacks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg-card)', borderRadius: '20px', border: '1px dashed var(--glass-border)' }}>
                        <i className="fa-solid fa-inbox" style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}></i>
                        <p style={{ color: 'var(--text-muted)' }}>Chưa có ý kiến đóng góp nào được ghi nhận.</p>
                    </div>
                ) : (
                    <div className="feedback-grid-premium" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
                        {feedbacks.map((f, idx) => (
                            <div key={f.id} className="feedback-ticket" style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', color: '#333' }}>
                                {/* Header Ticket */}
                                <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', padding: '24px', textAlign: 'center', color: 'white', position: 'relative' }}>
                                    <button 
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            if (confirm('Xóa phiếu phản hồi này?')) {
                                                try {
                                                    const res = await fetch(`/api/feedback/${f._id || f.id}`, { method: 'DELETE' });
                                                    if ((await res.json()).success) {
                                                        setFeedbacks(prev => prev.filter(item => (item._id || item.id) !== (f._id || f.id)));
                                                    }
                                                } catch (err) { console.error(err); }
                                            }
                                        }}
                                        style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.2)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', width: '24px', height: '24px' }}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                                        <i className="fa-regular fa-comment-dots" style={{ marginRight: '10px' }}></i>
                                        PHẢN HỒI GỬI ĐẾN BAN QUẢN TRỊ
                                    </h4>
                                    <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>(V/v: Thư viện Giai Điệu - Melody Library)</p>
                                </div>

                                {/* Body Ticket */}
                                <div style={{ padding: '24px' }}>
                                    <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Xin chào <span style={{ color: '#6366f1' }}>Admin</span>,</p>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                                        Dưới đây là nội dung ý kiến đóng góp chân thành của người dùng, được ghi nhận vào hệ thống:
                                    </p>

                                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', borderLeft: '4px solid #6366f1' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px dashed #e2e8f0' }}>
                                            <span style={{ fontSize: '1.2rem' }}>📋</span>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>Mã phiếu góp ý: <span style={{ color: '#6366f1' }}>#00{feedbacks.length - idx}</span></span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px dashed #e2e8f0' }}>
                                            <span style={{ fontSize: '1.2rem' }}>📅</span>
                                            <span style={{ fontSize: '0.95rem' }}>Ngày gửi: <strong>{new Date(f.timestamp).toLocaleDateString('vi-VN')}</strong></span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px dashed #e2e8f0' }}>
                                            <span style={{ fontSize: '1.2rem' }}>👤</span>
                                            <span style={{ fontSize: '0.95rem' }}>Người gửi: <strong>{f.email}</strong></span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                                            <span style={{ fontSize: '1.2rem' }}>⏰</span>
                                            <div style={{ fontSize: '0.95rem' }}>
                                                <strong>Nội dung:</strong> <span style={{ color: '#334155', fontWeight: 500 }}>{f.message}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminStats;
