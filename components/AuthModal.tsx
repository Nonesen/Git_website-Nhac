'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const { login } = useAuth();
    const { t } = useLanguage();
    
    const [view, setView] = useState<'login' | 'signup' | 'forgot-password'>('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [authKey, setAuthKey] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    // forgot-password: step 1 = nhập username, step 2 = nhập xác thực + mật khẩu mới
    const [forgotStep, setForgotStep] = useState<1 | 2>(1);
    const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);
    const [isCheckingRole, setIsCheckingRole] = useState(false);

    const switchView = (newView: 'login' | 'signup' | 'forgot-password') => {
        setView(newView);
        setError('');
        setSuccessMsg('');
        setForgotStep(1);
        setUserRole(null);
        setAuthKey('');
        setNewPassword('');
        setShowPassword(false);
        setShowNewPassword(false);
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    if (!isOpen) return null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        const result = await login(username, password);
        if (result.success) {
            onClose();
        } else {
            setError(result.message || 'Sai tên đăng nhập hoặc mật khẩu!');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, name, phoneNumber })
            });
            const data = await res.json();
            if (data.success) {
                setSuccessMsg('Đăng ký thành công! Hãy đăng nhập.');
                setTimeout(() => switchView('login'), 2000);
            } else {
                setError(data.message || 'Đăng ký thất bại!');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Lỗi hệ thống');
        }
    };

    const handleCheckRole = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsCheckingRole(true);
        try {
            const res = await fetch('/api/auth/check-role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });
            const data = await res.json();
            if (data.success) {
                setUserRole(data.role);
                setForgotStep(2);
            } else {
                setError(data.message || 'Không tìm thấy tài khoản này!');
            }
        } catch (err) {
            console.error('Role check error:', err);
            setError('Lỗi hệ thống');
        } finally {
            setIsCheckingRole(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, authKey, newPassword })
            });
            const data = await res.json();
            if (data.success) {
                setSuccessMsg('Đổi mật khẩu thành công! Hãy đăng nhập.');
                setTimeout(() => switchView('login'), 2000);
            } else {
                setError(data.message || 'Đổi mật khẩu thất bại!');
            }
        } catch (err) {
            console.error('Password reset error:', err);
            setError('Lỗi hệ thống');
        }
    };

    return (
        <div className={`auth-overlay ${isOpen ? 'active' : ''}`}>
            <div className="auth-card">
                <button className="auth-close-btn" onClick={onClose}>&times;</button>
                
                {view === 'login' ? (
                    <div id="login-form">
                        <div className="auth-header">
                            <h2>{t('header-login')}</h2>
                        </div>
                        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}
                        {successMsg && <p style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '0.85rem' }}>{successMsg}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Nhập username của bạn" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form-group password-group">
                                <input 
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password`} onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}></i>
                            </div>
                            
                            <div className="auth-options">
                                <label className="custom-checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    Nhớ cho lần đăng nhập tới
                                </label>
                                <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); switchView('forgot-password'); }}>Quên mật khẩu?</a>
                            </div>

                            <button type="submit" className="btn-auth-submit">Đăng nhập</button>
                            <p className="auth-switch">Chưa có tài khoản? <span onClick={() => switchView('signup')}>Đăng ký ngay</span></p>
                        </form>
                    </div>
                ) : view === 'signup' ? (
                    <div id="signup-form">
                        <div className="auth-header">
                            <h2>Đăng ký tài khoản</h2>
                        </div>
                        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}
                        {successMsg && <p style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '0.85rem' }}>{successMsg}</p>}
                        <form onSubmit={handleRegister}>
                            <div className="form-group">
                                <input type="text" placeholder="Họ và tên của bạn" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="form-group password-group">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Mật khẩu của bạn" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <i className={`fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password`} onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}></i>
                            </div>
                            <button type="submit" className="btn-auth-submit">Đăng ký</button>
                            <p className="auth-switch">Đã có tài khoản? <span onClick={() => switchView('login')}>Đăng nhập</span></p>
                        </form>
                    </div>
                ) : (
                    <div id="forgot-password-form">
                        <div className="auth-header">
                            <h2>Đổi Mật Khẩu</h2>
                        </div>
                        {error && <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}
                        {successMsg && <p style={{ color: '#22c55e', marginBottom: '1rem', fontSize: '0.85rem' }}>{successMsg}</p>}

                        {forgotStep === 1 ? (
                            // Bước 1: Nhập tên đăng nhập để xác định loại tài khoản
                            <form onSubmit={handleCheckRole}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Nhập tên đăng nhập của bạn"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-auth-submit" disabled={isCheckingRole}>
                                    {isCheckingRole ? 'Đang kiểm tra...' : 'Tiếp theo'}
                                </button>
                                <p className="auth-switch">Quay lại <span onClick={() => switchView('login')}>Đăng nhập</span></p>
                            </form>
                        ) : (
                            // Bước 2: Hiện field xác thực tuỳ theo loại tài khoản
                            <form onSubmit={handleResetPassword}>
                                <div className="form-group">
                                    <input type="text" value={username} readOnly style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                                </div>
                                <div className="form-group">
                                    <input
                                        type={userRole === 'admin' ? 'password' : 'text'}
                                        placeholder={userRole === 'admin' ? 'Mật khẩu xác nhận của Admin' : 'Số điện thoại đã đăng ký'}
                                        value={authKey}
                                        onChange={(e) => setAuthKey(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group password-group">
                                    <input type={showNewPassword ? 'text' : 'password'} placeholder="Mật khẩu mới" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                    <i className={`fa-regular ${showNewPassword ? 'fa-eye' : 'fa-eye-slash'} toggle-password`} onClick={() => setShowNewPassword(!showNewPassword)} style={{ cursor: 'pointer' }}></i>
                                </div>
                                <button type="submit" className="btn-auth-submit">Xác nhận đổi</button>
                                <p className="auth-switch">
                                    <span onClick={() => { setForgotStep(1); setError(''); setAuthKey(''); setNewPassword(''); }}>← Nhập lại tên đăng nhập</span>
                                </p>
                            </form>
                        )}
                    </div>
                )}

                <div className="demo-creds">
                    <span>Username: <strong>user</strong> | Password: <strong>1234</strong></span>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
