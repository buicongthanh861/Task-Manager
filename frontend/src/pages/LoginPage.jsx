import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setError('');
    try { await login(form.email, form.password); nav('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Đăng nhập thất bại'); }
  };

  return (
    <div className="auth-page">
      <form onSubmit={submit} className="auth-form">
        <h1>Task Manager</h1>
        <h2>Đăng nhập</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Mật khẩu" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Đăng nhập</button>
        <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
      </form>
    </div>
  );
}
